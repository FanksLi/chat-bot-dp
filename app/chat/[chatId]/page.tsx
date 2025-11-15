"use client";

import { useChat } from "@ai-sdk/react";
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { DefaultChatTransport } from "ai";
import { useParams } from "next/navigation";
import { Chat, Message } from "@/app/@types/inex";
import { useUser } from "@clerk/nextjs";
import { Side } from "@/app/@components";
export default function Home() {
  const { user, isLoaded } = useUser();
  const { chatId } = useParams();
  const boxRef = useRef<HTMLDivElement>(null);
  const locked = useRef(false);

  const { messages, sendMessage, status, setMessages } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
    onFinish: () => {
      refeshBox();
    },
  });
  const [input, setInput] = useState("");

  useEffect(() => {
    if (!chatId || !user?.id) return;
    queryMessages();
  }, [chatId, user?.id]);
  useEffect(() => {
    refeshBox();
  }, [messages]);

  function refeshBox() {
    boxRef.current?.scrollTo({
      top: boxRef.current.scrollHeight,
      behavior: "smooth",
    });
  }

  async function queryMessages() {
    try {
      const res = await fetch("/api/get-messages", {
        method: "POST",
        body: JSON.stringify({
          chatId: Number(chatId),
        }),
      }).then((res) => res.json());
      if (res.length === 0) {
        init();
        return;
      }
      const initialMessages = res.map((message: Message) => ({
        id: message.id,
        role: message.role,
        parts: JSON.parse(message.content),
      }));
      setMessages(initialMessages);
    } catch (err) {
      console.error(err);
    }
  }

  async function init() {
    if(locked.current) return;
    try {
      locked.current = true;
      const res: Chat = await fetch("/api/get-chat", {
        method: "POST",
        body: JSON.stringify({
          userId: user?.id,
          chatId: Number(chatId),
        })
      }).then(res => res.json());
      const { title } = res;
       sendMessage(
        { text: title },
        {
          body: {
            chatId: Number(chatId),
            userId: user?.id,
          },
        }
      );
    } catch (err) {
      console.error(err);
    }
  }

  function handleSend(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (input.trim() && isLoaded && user) {
      // createMessage("user", input);
      sendMessage(
        { text: input },
        {
          body: {
            chatId: Number(chatId),
            userId: user.id,
          },
        }
      );
      setInput("");
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && isLoaded && user) {
        sendMessage(
          { text: input },
          {
            body: {
              chatId: Number(chatId),
              userId: user.id,
            },
          }
        );
        setInput("");
      }
    }
  }

  return (
    <main className="flex h-full">
      <aside className="w-[400px] bg-[#efefef] pl-5">
              <Side className="h-full py-[20px]" />
            </aside>
             <div className="h-full w-4xl flex flex-col items-center justify-center relative mx-auto  pb-[200px]">
      <div className="w-full h-full flex flex-col overflow-y-auto" ref={boxRef}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={classNames(
              "inline-block max-w-[80%] m-2 p-4",
              message.role === "user"
                ? "text-right justify-end  rounded-2xl"
                : "text-left"
            )}
          >
            <span
              className={classNames(
                "p-4 max-w-full relative inline-block",
                message.role === "user" ? "bg-[#edf3fe]" : "bg-[#fafafa]"
              )}
            >
              {message.parts.map((part, index) =>
                part.type === "text" ? (
                  <span key={index}>{part.text}</span>
                ) : null
              )}
            </span>
          </div>
        ))}
      </div>
      <div
        className={classNames(
          "absolute bottom-10 w-full flex flex-col items-center justify-center"
        )}
      >
        <div className="w-[80%]">
          <form
            onSubmit={handleSend}
            className={`flex gap-2 border-[#eee] border-2 rounded-lg p-4 h-[100px]`}
          >
            <textarea
              className="w-full outline-none border-none resize-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="请输入..."
              disabled={status !== "ready" || !isLoaded}
            />
            <button
              className={classNames(
                "w-[100px] cursor-pointer",
                status !== "ready" || !isLoaded
                  ? "cursor-not-allowed text-gray-400"
                  : "text-gray-600"
              )}
              disabled={status !== "ready" || !isLoaded || !user}
              type="submit"
            >
              发送
            </button>
          </form>
        </div>
      </div>
    </div>
    </main>
   
  );
}
