"use client";

import { memo, useEffect, useRef } from "react";
import { Modal, Input, Button, Typography } from "antd";
import { FullscreenExitOutlined, SendOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { Title } = Typography;

interface Props {
  open: boolean;
  input: string;
  status: string;
  chatId: string | null;
  onClose: () => void;
  onInputChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onSend: () => void;
}

const FullscreenModal = memo(function FullscreenModal({ open, input, status, chatId, onClose, onInputChange, onKeyDown, onSend }: Props) {
  const textareaRef = useRef<any>(null);

  useEffect(() => {
    if (open && status === "ready") {
      setTimeout(() => textareaRef.current?.focus?.(), 100);
    }
  }, [open, status]);

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width="100%"
      style={{ top: 0, maxWidth: "100vw", padding: 0 }}
      styles={{ body: { height: "100vh", padding: "24px", display: "flex", flexDirection: "column" } }}
      closable={false}
      title={null}
    >
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center mb-4">
          <Title level={4}>全屏输入模式</Title>
          <div className="flex gap-2">
            <Button
              icon={<FullscreenExitOutlined />}
              onClick={onClose}
            >
              退出全屏
            </Button>
            <Button
              type="primary"
              icon={<SendOutlined />}
              onClick={onSend}
              disabled={!input.trim() || status !== "ready"}
              loading={status === "streaming"}
            >
              发送
            </Button>
          </div>
        </div>
        <TextArea
          ref={textareaRef}
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={chatId ? "请输入消息... (Enter发送, Esc退出全屏)" : "输入话题开始新对话... (Enter发送, Esc退出全屏)"}
          className="flex-1"
          style={{ resize: "none", fontSize: "16px", lineHeight: "1.8" }}
          disabled={status !== "ready"}
        />
      </div>
    </Modal>
  );
});

export default FullscreenModal;