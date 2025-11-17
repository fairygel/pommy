const GEMINI = 'gemini';
const CHATGPT = 'chatgpt';
const HUGGINGFACE = 'huggingface';
const CLAUDE = 'claude';
const OPENROUTER = 'openrouter';

export class Providers {
    static isGemini(provider) {
        return format(provider) === GEMINI;
    }

    static isChatGPT(provider) {
        return format(provider) === CHATGPT;
    }

    static isHuggingFace(provider) {
        return format(provider) === HUGGINGFACE;
    }

    static isClaude(provider) {
        return format(provider) === CLAUDE;
    }

    static isOpenRouter(provider) {
        return format(provider) === OPENROUTER;
    }

    static getValues() {
        return [GEMINI, CHATGPT, HUGGINGFACE, CLAUDE, OPENROUTER];
    }

    static isValidProvider(provider) {
        return format(provider) in this.getValues();
    }

    static format(provider) {
        return provider? provider.trim().toLowerCase().replace(/-/g, '').replace(/_/g, '') : '';
    }
}