import { MessageDto } from './Message';

export class MessengerUser {
    userName: string;
    connectionId: string;
    unreadedMessages: number;
    messages: MessageDto[] = [];
}
