# AGENTS.md

本文档为在此代码库中工作的 AI 编程代理提供指导。

## 项目概述

一个基于 Next.js 15 的聊天机器人应用：
- **AI**: Deepseek AI SDK 实现聊天功能
- **UI**: Ant Design 组件库
- **数据库**: PostgreSQL + Drizzle ORM（托管于 Supabase）
- **样式**: Tailwind CSS 4 + Ant Design
- **语言**: TypeScript（严格模式）

## 命令

### 开发
```bash
npm run dev       # 使用 Turbopack 启动开发服务器
npm run build     # 使用 Turbopack 构建生产版本
npm run start     # 启动生产服务器
npm run lint      # 运行 ESLint
```

### 数据库 (Drizzle)
```bash
npx drizzle-kit push    # 推送 schema 变更到数据库
npx drizzle-kit pull    # 从数据库拉取 schema
npx drizzle-kit studio  # 打开 Drizzle Studio
```

### 测试
当前未配置测试框架。添加测试时，请安装 Vitest 或 Jest 等框架。

## 项目结构

```
├── app/
│   ├── api/            # API 路由处理器
│   │   ├── chat/       # AI 聊天流式接口
│   │   ├── create-chat/
│   │   ├── get-chat/
│   │   ├── get-chats/
│   │   └── get-messages/
│   ├── layout.tsx      # 根布局
│   ├── page.tsx        # 主页面（聊天界面 + 侧边栏）
│   └── globals.css     # 全局样式
├── db/
│   ├── index.ts        # 数据库操作函数
│   └── schema.ts       # Drizzle schema 定义
└── drizzle.config.ts   # Drizzle 配置
```

## 路由说明

- 主页面 `/` - 显示聊天列表，可开始新对话
- 查看聊天 `/?chatId=N` - 通过 query 参数查看指定聊天

## 代码风格指南

### 导入
- 使用 `@/*` 路径别名导入项目根目录文件
- 导入顺序：外部包优先，然后是内部模块
- Ant Design 组件按需导入：
  ```typescript
  import { Layout, Menu, Input, Button, List, Card } from "antd";
  import { PlusOutlined, SendOutlined } from "@ant-design/icons";
  ```

### TypeScript
- **已启用严格模式** - 避免使用 `any`，使用正确的类型
- 对象形状使用 `interface`，联合类型/别名使用 `type`
- 使用 `$inferSelect` 从 Drizzle schema 推断类型：
  ```typescript
  export type ChatModel = typeof chatsTable.$inferSelect;
  ```
- 不应变化的 props 使用 `Readonly<>`：
  ```typescript
  export default function RootLayout({
    children,
  }: Readonly<{ children: React.ReactNode }>) {
  ```

### React 组件
- 客户端组件使用 `"use client"` 指令
- 使用函数组件并默认导出
- 使用 `useCallback` 包装依赖链中的异步函数
- 组件内定义的接口放在组件外部：
  ```typescript
  interface ChatItem {
    id: number;
    title: string;
  }
  export default function Home() { ... }
  ```

### API 路由
- 导出异步函数处理 HTTP 方法：`GET`、`POST`
- 返回带有正确状态码的 `Response` 对象
- 从 `await req.json()` 解构请求体
- 使用 try/catch 处理错误，返回 null 或错误响应
- 长时间运行的请求使用 `maxDuration` 导出：
  ```typescript
  export const maxDuration = 30;
  ```
- 未使用的参数使用 `_` 前缀：
  ```typescript
  export async function POST(_req: Request) { ... }
  ```

### 数据库操作
- 所有数据库函数位于 `db/index.ts`
- 使用 Drizzle ORM 方法：`db.select()`、`db.insert()`、`.where()`
- 使用 `drizzle-orm` 的 `eq()`、`and()` 构建条件
- 始终用 try/catch 包装，错误时返回 `null`

### 样式
- 使用 Tailwind CSS 工具类配合 Ant Design 组件
- 条件类名使用模板字符串或 classNames
- Ant Design 组件通过 className 属性添加 Tailwind 类

### 错误处理
- 异步操作使用 try/catch 包装
- 使用 `console.error()` 记录错误
- Ant Design message 组件显示用户提示：
  ```typescript
  import { message } from "antd";
  message.error("操作失败");
  ```

### 命名规范
- **组件**: PascalCase（如 `Home`）
- **文件**: 小写连字符（如 `page.tsx`、`route.ts`）
- **数据库表**: camelCase 加 `Table` 后缀（如 `chatsTable`）
- **类型/接口**: PascalCase（如 `ChatItem`、`MessageItem`）
- **函数**: camelCase（如 `queryChats`、`handleSend`）

### 状态管理
- 使用 React hooks：`useState`、`useEffect`、`useRef`、`useCallback`
- 不需要触发重渲染的值使用 `useRef`
- 从 URL 获取参数使用 `useSearchParams`：
  ```typescript
  const searchParams = useSearchParams();
  const chatId = searchParams.get("chatId");
  ```

### 环境变量
`.env` 中需要：
- `DATABASE_URL` - PostgreSQL 连接字符串
- `DEEPSEEK_API_KEY` - Deepseek API 密钥

### 代码注释
- 注释使用中文 - 保持一致性
- 单行注释使用 `//`
- 提交前移除 console.log 语句（调试除外）

## 注意事项

1. **API 路由**: 使用 `POST` 进行变更操作
2. **流式传输**: 聊天 API 使用 AI SDK 的 `streamText()` 配合 `toUIMessageStreamResponse()`
3. **Query 参数**: 使用 `useSearchParams` hook 获取 URL 参数
4. **Ant Design**: 使用 Layout、Sider、Content 构建页面布局