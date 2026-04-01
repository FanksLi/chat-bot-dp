import { getChat } from "@/db";



export async function POST(req: Request) {
    const { chatId }: { chatId: number } = await req.json();
    const chat = await getChat(chatId);
    console.log("🚀 ~ POST ~ chat:", chat)

    return new Response(JSON.stringify(chat), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });

}