import { deleteChat } from "@/db";

export async function POST(req: Request) {
    const { chatId }: { chatId: number } = await req.json();
    
    if (!chatId) {
        return new Response(JSON.stringify({ success: false, error: "chatId is required" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    const success = await deleteChat(chatId);

    return new Response(JSON.stringify({ success }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}