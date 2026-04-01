"use client";

import { memo } from "react";
import { Modal, Typography } from "antd";
import { ChatItem } from "@/app/types";

interface Props {
  open: boolean;
  chat: ChatItem | null;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteModal = memo(function DeleteModal({ open, chat, onClose, onConfirm }: Props) {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      onOk={onConfirm}
      title="确认删除"
      okText="删除"
      cancelText="取消"
      okButtonProps={{ danger: true }}
    >
      <Typography.Text>
        确定要删除对话「{chat?.title}」吗？删除后无法恢复。
      </Typography.Text>
    </Modal>
  );
});

export default DeleteModal;