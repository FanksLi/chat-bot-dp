import { getChats } from "@/db";

export async function POST() {
    const chats = await getChats();

    return new Response(JSON.stringify(chats), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}