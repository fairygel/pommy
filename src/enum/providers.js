const GEMINI = 'gemini';
const CHATGPT = 'chatgpt';
const HUGGINGFACE = 'huggingface';
const CLAUDE = 'claude';
const OPENROUTER = 'openrouter';

export class Providers {
    static isGemini(provider) {
        return this.format(provider) === GEMINI;
    }

    static isChatGPT(provider) {
        return this.format(provider) === CHATGPT;
    }

    static isHuggingFace(provider) {
        return this.format(provider) === HUGGINGFACE;
    }

    static isClaude(provider) {
        return this.format(provider) === CLAUDE;
    }

    static isOpenRouter(provider) {
        return this.format(provider) === OPENROUTER;
    }

    static getValues() {
        return [GEMINI, CHATGPT, HUGGINGFACE, CLAUDE, OPENROUTER];
    }

    static isValidProvider(provider) {
        return this.getValues().includes(this.format(provider));
    }

    static format(provider) {
        return provider? provider.trim().toLowerCase().replace(/-/g, '').replace(/_/g, '') : '';
    }
}