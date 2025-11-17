import { GeminiCallout } from "../callout/gemini_callout.js";
import { RequestDTO } from "../dto/request_dto.js";
import { ApiKeyStorage } from "../storage/apikey_storage.js";

const apiKeyStorage = new ApiKeyStorage();

// TODO make customizable
const prompt = 'Analyze the following webpage content and provide a summary of its main points. Summary should use content\'s language.';

export class AnalyzerService {
    async analyzePage() {
        const pageContent = await getActiveTabContent();
        const apiKey = apiKeyStorage.getApiKey('GEMINI');

        const requestDTO = new RequestDTO(apiKey, pageContent, prompt);
        const geminiCallout = new GeminiCallout();
        const result = await geminiCallout.makeRequest(requestDTO);

        if (result.isError) {
            return {
                isError: true,
                message: result.data?.error?.message || `Request failed with code ${result.code}`
            };
        }

        const text = result.data?.candidates?.[0]?.content?.parts
			?.map((p) => p.text ?? "")
			.join("\n")
			.trim();

		return {
			isError: false,
			message: text || "No response"
		};
    }
}

async function getActiveTabContent() {
	const [tab] = await browser.tabs.query({
		active: true,
		currentWindow: true,
	});
	if (!tab?.id) throw new Error("No Active Tab");

	return browser.tabs.sendMessage(tab.id, { type: "GET_PAGE_CONTENT" });
}