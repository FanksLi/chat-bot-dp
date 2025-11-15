"use client";

import { useUser } from "@clerk/nextjs";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Success } from "./@components/Icons";


export default function Home() {
  const [input, setInput] = useState("");
  const { user } = useUser();
  const route = useRouter();
  // console.log("🚀 ~ Home ~ user:", user);
  
  async function handleSend() {
    if (!input.trim()) return;
    
    try {
      const res = await fetch(`/api/create-chat`, {
        method: "POST",
        body: JSON.stringify({
          title: input,
          userId: user?.id,
        }),
      }).then((res) => res.json());
      const { id } = res;
      route.push(`/chat/${id}`);
      setInput("");
    } catch (err) {
      console.error(err);
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-full w-4xl flex flex-col items-center justify-center relative mx-auto">
      <div className=""></div>
      <div
        className={classNames(
          "absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-full flex flex-col items-center justify-center"
        )}
      >
        <div className="w-[60%]">
          <div className="text-left w-full mb-4 text-gray-400">
            有什么可以帮助您的?
          </div>
          <div
            className={`flex gap-2 border-[#eee] border-2 rounded-lg p-4 h-[200px]`}
          >
            <textarea
              className="w-full outline-none border-none resize-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="请输入..."
            />
            <button
              className={input.trim() ? "cursor-pointer" : "cursor-not-allowed text-gray-400"}
              onClick={handleSend}
            >
              发送
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}