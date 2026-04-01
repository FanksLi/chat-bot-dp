import { type Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Deepseek Chat",
  description: "基于 Deepseek 的聊天机器人",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh" className="h-full">
      <body className="antialiased h-full" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}