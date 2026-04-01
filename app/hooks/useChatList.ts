import { useState, useCallback, useEffect } from "react";
import { message } from "antd";
import { ChatItem } from "@/app/types";

export function useChatList() {
  const [chats, setChats] = useState<ChatItem[]>([]);

  const queryChats = useCallback(async () => {
    try {
      const res = await fetch("/api/get-chats", {
        method: "POST",
      }).then((res) => res.json());
      setChats(res || []);
    } catch (err) {
      console.error(err);
      message.error("获取聊天列表失败");
    }
  }, []);

  useEffect(() => {
    queryChats();
  }, [queryChats]);

  return { chats, setChats, queryChats };
}