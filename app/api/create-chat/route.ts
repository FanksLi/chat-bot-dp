import { createChat } from "@/db";



export async function POST(req: Request) {
    const { title, model = 'deepseek-chat', userId }: { title: string, model: string, userId: string } = await req.json();
   // 修复方式1：分别传递三个参数
    const newChat = await createChat(title, userId, model);

    return new Response(JSON.stringify(newChat), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });

}