import { getChats } from "@/db";



export async function POST(req: Request) {
    const { userId }: { userId: string } = await req.json();
   // 修复方式1：分别传递三个参数
    const newChat = await getChats(userId);

    return new Response(JSON.stringify(newChat), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });

}