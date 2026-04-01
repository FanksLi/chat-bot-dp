"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect, useRef, useState, useCallback } from "react";
import { DefaultChatTransport } from "ai";
import { useSearchParams, useRouter } from "next/navigation";
import { Layout, message, Button } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import Sidebar from "@/app/components/Sidebar";
import MessageList from "@/app/components/MessageList";
import InputArea from "@/app/components/InputArea";
import WelcomeCards from "@/app/components/WelcomeCards";
import ScrollToBottom from "@/app/components/ScrollToBottom";
import { FullscreenModal, DeleteModal } from "@/app/components/Modals";
import { useChatList } from "@/app/hooks";
import { ChatItem } from "@/app/types";

const { Content } = Layout;

export default function HomeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const chatId = searchParams.get("chatId");
  const boxRef = useRef<HTMLDivElement>(null);
  const locked = useRef(false);

  const { chats, queryChats } = useChatList();
  const [loading, setLoading] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [input, setInput] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [chatToDelete, setChatToDelete] = useState<ChatItem | null>(null);

  const { messages, sendMessage, status, setMessages } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
    onFinish: () => {
      refreshBox();
    },
  });

  const initChat = useCallback(async () => {
    if (locked.current) return;
    try {
      locked.current = true;
      const res: ChatItem = await fetch("/api/get-chat", {
        method: "POST",
        body: JSON.stringify({
          chatId: Number(chatId),
        }),
      }).then((res) => res.json());
      if (res?.title) {
        sendMessage(
          { text: res.title },
          {
            body: {
              chatId: Number(chatId),
            },
          }
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      locked.current = false;
    }
  }, [chatId, sendMessage]);

  const queryMessages = useCallback(async () => {
    if (!chatId) return;
    try {
      setLoading(true);
      const res = await fetch("/api/get-messages", {
        method: "POST",
        body: JSON.stringify({
          chatId: Number(chatId),
        }),
      }).then((res) => res.json());
      if (res.length === 0) {
        initChat();
        return;
      }
      const initialMessages = res.map((msg: { id: number; content: string; role: string }) => ({
        id: msg.id,
        role: msg.role,
        parts: JSON.parse(msg.content),
      }));
      setMessages(initialMessages);
    } catch (err) {
      console.error(err);
      message.error("获取消息失败");
    } finally {
      setLoading(false);
    }
  }, [chatId, setMessages, initChat]);

  useEffect(() => {
    if (chatId) {
      queryMessages();
    } else {
      setMessages([]);
    }
  }, [chatId, queryMessages, setMessages]);

  useEffect(() => {
    refreshBox();
  }, [messages]);

  function refreshBox() {
    boxRef.current?.scrollTo({
      top: boxRef.current.scrollHeight,
      behavior: "smooth",
    });
  }

  async function createNewChat(title: string) {
    if (!title.trim()) return;
    try {
      const res = await fetch(`/api/create-chat`, {
        method: "POST",
        body: JSON.stringify({
          title: title.trim(),
        }),
      }).then((res) => res.json());
      if (res?.id) {
        router.push(`/?chatId=${res.id}`);
        queryChats();
      }
    } catch (err) {
      console.error(err);
      message.error("创建聊天失败");
    }
  }

  function handleSend() {
    if (!input.trim()) return;
    if (!chatId) {
      createNewChat(input.trim());
      setInput("");
      setFullscreen(false);
      return;
    }
    sendMessage(
      { text: input.trim() },
      {
        body: {
          chatId: Number(chatId),
        },
      }
    );
    setInput("");
    setFullscreen(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
    if (e.key === "Escape" && fullscreen) {
      setFullscreen(false);
    }
  }

  function handleMenuClick(e: { key: string }) {
    if (e.key === "new") {
      router.push("/");
      setInput("");
      setMessages([]);
    } else {
      router.push(`/?chatId=${e.key}`);
    }
  }

  function handleDeleteClick(e: React.MouseEvent, chat: ChatItem) {
    e.stopPropagation();
    setChatToDelete(chat);
    setDeleteModalOpen(true);
  }

  async function confirmDelete() {
    if (!chatToDelete) return;
    try {
      const res = await fetch("/api/delete-chat", {
        method: "POST",
        body: JSON.stringify({ chatId: chatToDelete.id }),
      }).then((res) => res.json());
      if (res.success) {
        message.success("删除成功");
        queryChats();
        if (String(chatToDelete.id) === chatId) {
          router.push("/");
          setMessages([]);
        }
      } else {
        message.error("删除失败");
      }
    } catch (err) {
      console.error(err);
      message.error("删除失败");
    } finally {
      setDeleteModalOpen(false);
      setChatToDelete(null);
    }
  }

  const getMessageText = useCallback((msg: { parts: unknown[] }) => {
    return (msg.parts as { type: string; text?: string }[])
      .filter((part) => part.type === "text" && part.text)
      .map((part) => part.text!)
      .join("");
  }, []);

  return (
    <Layout className="h-full">
      <Sidebar
        chats={chats}
        chatId={chatId}
        collapsed={collapsed}
        onMenuClick={handleMenuClick}
        onDeleteClick={handleDeleteClick}
      />
      <Content className="flex flex-col h-full bg-white relative">
        <div className="flex items-center p-2 border-b border-gray-100">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          />
        </div>
        <div
          className="flex-1 overflow-y-auto p-6"
          ref={boxRef}
        >
          {messages.length === 0 && !loading ? (
            <WelcomeCards />
          ) : (
            <MessageList
              messages={messages}
              loading={loading}
              status={status}
              getMessageText={getMessageText}
            />
          )}
        </div>
        <ScrollToBottom scrollContainerRef={boxRef} />
        <InputArea
          input={input}
          status={status}
          chatId={chatId}
          onInputChange={setInput}
          onKeyDown={handleKeyDown}
          onSend={handleSend}
          onFullscreen={() => setFullscreen(true)}
        />
      </Content>

      <FullscreenModal
        open={fullscreen}
        input={input}
        status={status}
        chatId={chatId}
        onClose={() => setFullscreen(false)}
        onInputChange={setInput}
        onKeyDown={handleKeyDown}
        onSend={handleSend}
      />

      <DeleteModal
        open={deleteModalOpen}
        chat={chatToDelete}
        onClose={() => {
          setDeleteModalOpen(false);
          setChatToDelete(null);
        }}
        onConfirm={confirmDelete}
      />
    </Layout>
  );
}