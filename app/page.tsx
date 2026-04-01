"use client";

import { Suspense } from "react";
import { Spin } from "antd";
import HomeContent from "./HomeContent";

export default function Home() {
  return (
    <Suspense fallback={
      <div className="h-full flex items-center justify-center">
        <Spin size="large" />
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}