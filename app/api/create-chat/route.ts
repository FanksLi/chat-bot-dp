import { createChat } from "@/db";



export async function POST(req: Request) {
    const { title, model = 'deepseek-chat' }: { title: string, model: string } = await req.json();
    const newChat = await createChat(title, model);

    return new Response(JSON.stringify(newChat), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });

}