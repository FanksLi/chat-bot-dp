"use client";

import { memo, useState, useEffect, useRef } from "react";
import { Button } from "antd";
import { DownOutlined } from "@ant-design/icons";

interface Props {
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}

const ScrollToBottom = memo(function ScrollToBottom({ scrollContainerRef }: Props) {
  const [show, setShow] = useState(false);
  const checkedRef = useRef(false);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    function checkScroll() {
      if (!container) return;
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 100;
      setShow(!isAtBottom);
    }

    if (!checkedRef.current) {
      checkedRef.current = true;
      checkScroll();
    }

    container.addEventListener("scroll", checkScroll);
    
    const timer = setInterval(checkScroll, 500);

    return () => {
      container.removeEventListener("scroll", checkScroll);
      clearInterval(timer);
    };
  }, [scrollContainerRef]);

  function scrollToBottom() {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });
    setShow(false);
  }

  if (!show) return null;

  return (
    <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10">
      <Button
        shape="circle"
        icon={<DownOutlined />}
        onClick={scrollToBottom}
        className="shadow-md"
      />
    </div>
  );
});

export default ScrollToBottom;