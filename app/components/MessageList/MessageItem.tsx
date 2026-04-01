"use client";

import { memo } from "react";
import { Avatar, Tag } from "antd";
import { UserOutlined, RobotOutlined } from "@ant-design/icons";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Message } from "@/app/types";

interface Props {
  msg: Message;
  getMessageText: (msg: { parts: unknown[] }) => string;
}

const MessageItem = memo(function MessageItem({ msg, getMessageText }: Props) {
  const text = getMessageText(msg);
  const isUser = msg.role === "user";

  return (
    <div
      className={`flex items-start gap-3 message-fade-in ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      <Avatar
        icon={isUser ? <UserOutlined /> : <RobotOutlined />}
        className={isUser ? "bg-blue-500" : "bg-emerald-500"}
      />
      <div className={`flex flex-col gap-1 max-w-[85%] ${isUser ? "items-end" : "items-start"}`}>
        <Tag color={isUser ? "blue" : "green"}>
          {isUser ? "用户" : "AI"}
        </Tag>
        <div
          className={`rounded-lg ${
            isUser
              ? "bg-blue-100 px-4 py-3 text-right"
              : "bg-emerald-50 px-4 py-3 text-left"
          }`}
        >
          {isUser ? (
            <span className="whitespace-pre-wrap leading-relaxed">{text}</span>
          ) : (
            <div className="markdown-body leading-relaxed">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {text}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default MessageItem;