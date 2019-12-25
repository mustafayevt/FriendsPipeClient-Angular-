import { MessageDto } from './Message';

export class MessengerUser {
    userName: string;
    connectionId: string;
    messages: MessageDto[] = [];
}
