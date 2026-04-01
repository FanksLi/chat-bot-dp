import { createDeepSeek } from '@ai-sdk/deepseek';
import { convertToModelMessages, streamText, UIMessage } from 'ai';
import { createMessage } from "@/db";


export const maxDuration = 30;

const deepseek = createDeepSeek({
  apiKey: process.env.DEEPSEEK_API_KEY ?? '',
});

export async function POST(req: Request) {
  const { messages, chatId }: { messages: UIMessage[], chatId: number } = await req.json();

  const lastMessage = messages[messages.length - 1];

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
}