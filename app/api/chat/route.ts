import { createDeepSeek } from '@ai-sdk/deepseek';
import { convertToModelMessages, streamText, UIMessage } from 'ai';
import { createMessage } from "@/db";


export const maxDuration = 30;

const deepseek = createDeepSeek({
  apiKey: process.env.DEEPSEEK_API_KEY ?? '',
});

export async function POST(req: Request) {
  const body = await req.json();
  const { messages, chatId }: { messages: UIMessage[], chatId: number } = body;


  if (!chatId) {
    return new Response(JSON.stringify({ error: "chatId is required" }), { status: 400 });
  }

  const lastMessage = messages[messages.length - 1];
  try {
    await createMessage(chatId, JSON.stringify(lastMessage.parts), lastMessage.role);
    const result = streamText({
      model: deepseek('deepseek-chat'),
      system: '你是一个聊天机器人',
      messages: convertToModelMessages(messages),
      onFinish: async (message) => {
        await createMessage(chatId, JSON.stringify([
          { type: 'text', text: message.text }
        ]), 'assistant');
      },
    });
    return result.toUIMessageStreamResponse();

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(JSON.stringify({ error: errorMessage }), { status: 500 });
  }


}