export class PromptStorage {
    getPrompt() {
        return localStorage.getItem('prompt');
    }

    setPrompt(prompt) {
        localStorage.setItem('prompt', prompt);
    }
}