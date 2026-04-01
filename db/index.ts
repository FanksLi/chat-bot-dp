import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq, asc } from 'drizzle-orm';
import { chatsTable, messagesTable } from './schema';

const db = drizzle(process.env.DATABASE_URL!);


export async function createChat(title: string, model: string) {

    try {
        const [newChat] = await db.insert(chatsTable).values({
            title,
            userId: 'default',
            model
        }).returning();
        return newChat;
    } catch (err) {
        console.error(err);
        return null;
    }
}


export async function getChat(chatId: number) {

    try {
        const chats = await db.select()
            .from(chatsTable)
            .where(eq(chatsTable.id, chatId));

        if (chats.length === 0) {
            return null;
        }
        return chats[0];
    } catch(err) {
        console.log(err);
        return null;
    }
}

export async function getChats() {

    try {
        const chats = await db.select().from(chatsTable);

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
            createdAt: Date.now(),
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
        .where(eq(messagesTable.chatId, chatId))
        .orderBy(asc(messagesTable.createdAt));

        return messages;
    } catch(err) {
        console.error(err);
        return null;
    }
}

export async function deleteChat(chatId: number) {
    try {
        await db.delete(messagesTable).where(eq(messagesTable.chatId, chatId));
        await db.delete(chatsTable).where(eq(chatsTable.id, chatId));
        return true;
    } catch(err) {
        console.error(err);
        return false;
    }
}