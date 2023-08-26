export class ErrorMessageData{
    error: string;
    message: string;

    constructor(errorText: string, messageText: string) {
        this.error = errorText;
        this.message = messageText;
    }
}