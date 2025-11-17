export class ResponseDTO {
    constructor(isError, code, data = null) {
        if (!code) {
            throw new Error('Invalid parameters. code is required.');
        }

        if (typeof isError !== 'boolean') {
            throw new Error('Invalid parameter. isError must be a boolean.');
        }
        if (typeof code !== 'number') {
            throw new Error('Invalid parameter. code must be a number.');
        }

        this.isError = isError;
        this.code = code;
        this.data = data;
    }
}