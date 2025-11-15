import { getChat } from "@/db";



export async function POST(req: Request) {
    const { userId, chatId }: { userId: string, chatId: number } = await req.json();
   // 修复方式1：分别传递三个参数
    const chat = await getChat(chatId, userId);
    console.log("🚀 ~ POST ~ chat:", chat)

    return new Response(JSON.stringify(chat), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });

}