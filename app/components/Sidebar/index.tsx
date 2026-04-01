"use client";

import { memo, useMemo } from "react";
import { Layout, Menu, Button, Typography } from "antd";
import { PlusOutlined, MessageOutlined, DeleteOutlined } from "@ant-design/icons";
import { ChatItem } from "@/app/types";

const { Sider } = Layout;
const { Title } = Typography;

interface Props {
  chats: ChatItem[];
  chatId: string | null;
  collapsed: boolean;
  onMenuClick: (e: { key: string }) => void;
  onDeleteClick: (e: React.MouseEvent, chat: ChatItem) => void;
}

const Sidebar = memo(function Sidebar({ chats, chatId, collapsed, onMenuClick, onDeleteClick }: Props) {
  const menuItems = useMemo(() => [
    {
      key: "new",
      icon: <PlusOutlined />,
      label: "新建对话",
    },
    ...chats.map((chat) => ({
      key: String(chat.id),
      icon: <MessageOutlined />,
      label: (
        <div className="flex items-center justify-between group">
          <span className="truncate flex-1">{chat.title}</span>
          <Button
            type="text"
            size="small"
            icon={<DeleteOutlined />}
            className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500"
            onClick={(e) => onDeleteClick(e, chat)}
          />
        </div>
      ),
    })),
  ], [chats, onDeleteClick]);

  return (
    <Sider
      width={260}
      collapsedWidth={0}
      collapsed={collapsed}
      theme="light"
      className="border-r border-gray-200"
      trigger={null}
    >
      <div className="h-full flex flex-col">
        <div className="p-4 border-b border-gray-100">
          <Title level={4} className="mb-0 max-w-full whitespace-nowrap">
            Deepseek Chat
          </Title>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          <Menu
            mode="inline"
            selectedKeys={[chatId || "new"]}
            items={menuItems}
            onClick={onMenuClick}
            style={{ borderInlineEnd: 'none' }}
          />
        </div>
      </div>
    </Sider>
  );
});

export default Sidebar;