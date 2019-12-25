export class MessageDto {
    senderId: string;
    message: string;
    isIncoming: boolean;
    constructor(msg: string, incoming: boolean) {
        this.message = msg;
        this.isIncoming = incoming;
    }
}
