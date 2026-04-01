# Deepseek Chat

基于 Deepseek 大模型的 AI 聊天助手，支持流式对话、Markdown 渲染、多会话管理。

## 功能特性

- **AI 对话** - 基于 Deepseek 大模型的智能对话，支持流式输出
- **Markdown 支持** - AI 回复支持 Markdown 语法渲染，包括代码块、列表、表格等
- **多会话管理** - 支持创建、切换、删除多个对话会话
- **全屏输入** - 支持全屏编辑模式，提升长文本输入体验
- **侧边栏折叠** - 支持侧边栏折叠/展开，优化屏幕空间利用
- **响应式布局** - 适配不同屏幕尺寸，提供良好的用户体验

## 技术栈

- **框架**: Next.js 15 (App Router + Turbopack)
- **语言**: TypeScript (严格模式)
- **UI**: Ant Design + Tailwind CSS 4
- **AI**: @ai-sdk/deepseek + AI SDK
- **数据库**: PostgreSQL + Drizzle ORM (Supabase)
- **Markdown**: react-markdown + remark-gfm

## 项目结构

```
├── app/
│   ├── api/              # API 路由
│   │   ├── chat/         # AI 对话流式接口
│   │   ├── create-chat/  # 创建对话
│   │   ├── delete-chat/  # 删除对话
│   │   ├── get-chat/     # 获取单个对话
│   │   ├── get-chats/    # 获取对话列表
│   │   └── get-messages/ # 获取消息列表
│   ├── layout.tsx        # 根布局
│   ├── page.tsx          # 主页面
│   └── globals.css       # 全局样式
├── db/
│   ├── index.ts          # 数据库操作
│   └── schema.ts         # 数据库 Schema
├── drizzle.config.ts     # Drizzle 配置
└── resume.md             # 个人简历数据
```

## 快速开始

### 环境要求

- Node.js 18+
- PostgreSQL 数据库

### 安装依赖

```bash
npm install
```

### 配置环境变量

创建 `.env` 文件：

```env
DATABASE_URL=your_postgresql_connection_string
DEEPSEEK_API_KEY=your_deepseek_api_key
```

### 启动开发服务器

```bash
npm run dev
```

### 数据库操作

```bash
# 推送 schema 到数据库
npx drizzle-kit push

# 打开 Drizzle Studio 管理数据库
npx drizzle-kit studio
```

## 命令

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 构建生产版本 |
| `npm run start` | 启动生产服务器 |
| `npm run lint` | 运行 ESLint |

## 数据库表结构

### chats 表
| 字段 | 类型 | 说明 |
|------|------|------|
| id | serial | 主键 |
| userId | text | 用户 ID |
| title | text | 对话标题 |
| model | text | 使用的模型 |

### messages 表
| 字段 | 类型 | 说明 |
|------|------|------|
| id | serial | 主键 |
| chatId | integer | 关联的对话 ID |
| role | text | 角色 (user/assistant) |
| content | text | 消息内容 |

## License

MIT