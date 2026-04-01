"use client";

import { memo, useEffect, useRef } from "react";
import { Input, Button } from "antd";
import { SendOutlined, FullscreenOutlined } from "@ant-design/icons";

const { TextArea } = Input;

interface Props {
  input: string;
  status: string;
  chatId: string | null;
  focusKey?: number;
  onInputChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onSend: () => void;
  onFullscreen: () => void;
}

const InputArea = memo(function InputArea({ input, status, chatId, focusKey, onInputChange, onKeyDown, onSend, onFullscreen }: Props) {
  const textareaRef = useRef<any>(null);

  useEffect(() => {
    if (status === "ready") {
      textareaRef.current?.focus?.();
    }
  }, [status, chatId]);

  useEffect(() => {
    if (focusKey !== undefined) {
      setTimeout(() => textareaRef.current?.focus?.(), 350);
    }
  }, [focusKey]);

  return (
    <div className="p-4 border-t border-gray-100 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="flex gap-2 items-center">
          <div className="flex-1 relative" style={{ position: 'relative' }}>
            <TextArea
              ref={textareaRef}
              value={input}
              onChange={(e) => onInputChange(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder={chatId ? "请输入消息..." : "输入话题开始新对话..."}
              autoSize={{ minRows: 2, maxRows: 6 }}
              style={{ paddingRight: 40 }}
              disabled={status !== "ready"}
            />
            <div style={{ position: 'absolute', right: 8, bottom: 8 }}>
              <Button
                type="text"
                size="small"
                icon={<FullscreenOutlined />}
                onClick={onFullscreen}
                disabled={status !== "ready"}
                className="text-gray-400 hover:text-gray-600"
              />
            </div>
          </div>
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
    </div>
  );
});

export default InputArea;