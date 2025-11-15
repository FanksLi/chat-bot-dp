"use client";

import { useEffect, useState } from "react";

import { Chat } from "@/app/@types/inex";
import { useUser } from "@clerk/nextjs";
import { useParams, useRouter } from "next/navigation";
import classNames from "classnames";


interface Props {
  className?: string;
  children?: React.ReactNode;
}
export default function Side(props: Props) {
  const { className } = props;
  const route = useRouter();
  const { chatId } = useParams();
  // console.log("🚀 ~ Side ~ chatId:", chatId)

  const [chats, setChats] = useState([]);
  const { user } = useUser();
  

  useEffect(() => {
    if (!user?.id) return;
    queryChats();
  }, [user?.id]);
  async function queryChats() {
    try {
      const res = await fetch("/api/get-chats", {
        method: "POST",
        body: JSON.stringify({
          userId: user?.id,
        }),
      }).then((res) => res.json());
      setChats(res);
    } catch (err) {
      console.error(err);
    }
  }

  function handleClick(chat: Chat) {
    route.push(`/chat/${chat.id}`);
  }


  return (
    <div className={className}>
      <div className="h-full overflow-y-auto">
        {chats.map((chat: Chat) => (
          <div key={chat.id} className={classNames("p-4 hover:bg-white cursor-pointer", Number(chatId || 0) === chat.id ? 'bg-white' : '')} onClick={() => handleClick(chat)}>
            {chat.title}
          </div>
        ))}
      </div>
    </div>
  );
}
