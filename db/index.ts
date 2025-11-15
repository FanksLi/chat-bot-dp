
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import { and, eq } from 'drizzle-orm';
import { chatsTable, messagesTable } from './schema';

const db = drizzle(process.env.DATABASE_URL!);


export async function createChat(title: string, userId: string, model: string) {

    try {
        const [newChat] = await db.insert(chatsTable).values({
            title,
            userId,
            model
        }).returning();
        return newChat;
    } catch (err) {
        console.error(err);
        return null;
    }
}


export async function getChat(chatId: number, userId: string) {

    try {
        const chats = await db.select()
            .from(chatsTable)
            .where(and(eq(chatsTable.id, chatId), eq(chatsTable.userId, userId)));

        if (chats.length === 0) {
            return null;
        }
        return chats[0];
    } catch(err) {
        console.log(err);
        return null;
    }
}

export async function getChats(userId: string) {

    try {
        const chats = await db.select().from(chatsTable)
        .where(eq(chatsTable.userId, userId));
        console.log("🚀 ~ getChats ~ chats:", chats)

        return chats;
    } catch(err) {
        console.error(err);

        return null;
    }
}


export async function createMessage(chatId: number, content: string, role: string) {

    try {
        const [newMessage] = await db.insert(messagesTable)
        .values({
            content,
            role,
            chatId,
        }).returning();

        return newMessage;
    } catch(err) {
        console.error(err);

        return null;
    }
}

export async function getMessages(chatId: number) {

    try {
        const messages = await db.select().from(messagesTable)
        .where(eq(messagesTable.chatId, chatId));

        return messages;
    } catch(err) {
        console.error(err);
        return null;
    }
}