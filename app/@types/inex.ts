

export interface Message {
    id: number;
    content: string;
    role: string;
    chatId: number;
}

export interface Chat {
    id: number;
    title: string;
    userId: string;
    model: string;
}