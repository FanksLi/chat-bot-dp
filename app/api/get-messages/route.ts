import { getMessages } from "@/db";



export async function POST(req: Request) {
    const { chatId }: { chatId: number } = await req.json();
   // 修复方式1：分别传递三个参数
    const messages = await getMessages(chatId);
    // console.log("🚀 ~ POST ~ messages:", messages)

    return new Response(JSON.stringify(messages), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });

}