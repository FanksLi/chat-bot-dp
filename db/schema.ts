import { integer, pgTable, varchar, serial, text, bigint } from 'drizzle-orm/pg-core';



export const users = pgTable('users', {
  id: varchar('id', { length: 255 }).primaryKey(),
  username: varchar('username', { length: 255 }),
  email: varchar('email', { length: 255 }),
  phone: varchar('phone', { length: 255 }),
  password: varchar('password', { length: 255 }),
  createdAt: integer('created_at'),
  updatedAt: integer('updated_at'),
})


export const chatsTable = pgTable('chats', {
    id: serial('id').primaryKey(),
    userId: text('user_id').notNull(),
    title: text('title').notNull(),
    model: text('model').notNull()
})


export const messagesTable = pgTable('messages', {
    id: serial('id').primaryKey(),
    chatId: integer('chat_id').references(() => chatsTable.id),
    role: text('role').notNull(),
    content: text('content').notNull(),
    createdAt: bigint('created_at', { mode: 'number' }).notNull(),
})

export type ChatModel = typeof chatsTable.$inferSelect;
export type MessageModel = typeof messagesTable.$inferSelect;