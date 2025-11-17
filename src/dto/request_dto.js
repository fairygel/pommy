export class RequestDTO {
    constructor(token, pageData, prompt) {
        if (!token || !pageData || !prompt) {
            throw new Error('Invalid parameters. Token, pageData and prompt are required.');
        }

        this.token = token;
        this.pageData = pageData;
        this.prompt = prompt;
    }
}