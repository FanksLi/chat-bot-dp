"use client";

import { memo } from "react";
import { Avatar, Tag } from "antd";
import { RobotOutlined } from "@ant-design/icons";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Message } from "@/app/types";

interface Props {
  msg: Message;
  getMessageText: (msg: { parts: unknown[] }) => string;
}

const StreamingMessage = memo(function StreamingMessage({ msg, getMessageText }: Props) {
  const text = getMessageText(msg);

  return (
    <div className="flex items-start gap-3 message-fade-in">
      <Avatar
        icon={<RobotOutlined />}
        className="bg-emerald-500"
      />
      <div className="flex flex-col gap-1 items-start max-w-[85%]">
        <Tag color="green">AI</Tag>
        <div className="bg-emerald-50 px-4 py-3 rounded-lg">
          <div className="markdown-body leading-relaxed">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {text}
            </ReactMarkdown>
          </div>
          <span className="inline-block w-2 h-4 bg-emerald-500 ml-1 typing-cursor"></span>
        </div>
      </div>
    </div>
  );
});

export default StreamingMessage;