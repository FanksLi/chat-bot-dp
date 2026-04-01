"use client";

import { memo, useMemo } from "react";
import { Spin } from "antd";
import MessageItem from "./MessageItem";
import StreamingMessage from "./StreamingMessage";
import { Message } from "@/app/types";

interface Props {
  messages: Message[];
  loading: boolean;
  status: string;
  getMessageText: (msg: { parts: unknown[] }) => string;
}

const MessageList = memo(function MessageList({ messages, loading, status, getMessageText }: Props) {
  const isStreaming = status === "streaming";
  const lastMessage = messages[messages.length - 1];
  const isAiStreaming = isStreaming && lastMessage?.role === "assistant";

  const messageList = useMemo(() => {
    if (messages.length === 0) return null;

    return messages.map((msg, index) => {
      const isLastAiMessage = isAiStreaming && index === messages.length - 1;
      
      if (isLastAiMessage) {
        return (
          <StreamingMessage
            key={msg.id}
            msg={msg}
            getMessageText={getMessageText}
          />
        );
      }

      return (
        <MessageItem
          key={msg.id}
          msg={msg}
          getMessageText={getMessageText}
        />
      );
    });
  }, [messages, isAiStreaming, getMessageText]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spin size="large" />
      </div>
    );
  }

  if (messages.length === 0) {
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {messageList}
    </div>
  );
});

export default MessageList;