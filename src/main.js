import { AnalyzerService } from "./service/analyzer_service.js";
import { ApiKeyStorage } from "./storage/apikey_storage.js";

const responseElement = document.querySelector("#response");
const tokenInput = document.querySelector("#token");
const showPasswordCheckbox = document.querySelector("#show-password");

const analyzerService = new AnalyzerService();
const apiKeyStorage = new ApiKeyStorage();

showPasswordCheckbox.addEventListener("change", () => {
	tokenInput.type = showPasswordCheckbox.checked ? "text" : "password";
});

tokenInput.addEventListener("input", () => {
	apiKeyStorage.setApiKey('GEMINI', tokenInput.value);
});

async function renderSummary() {
	responseElement.textContent = "Generating Summary...";

	try {
		const result = await analyzerService.analyzePage();

		if (result.isError) {
			responseElement.textContent = `error: ${result.message || "Unknown error"}`;
			return;
		}

		responseElement.textContent = result.message;
	} catch (err) {
		responseElement.textContent = `error: ${err.message || err}`;
	}
}

// onInit
document.addEventListener("DOMContentLoaded", () => {
	const storedToken = apiKeyStorage.getApiKey('GEMINI');
	if (storedToken) {
		tokenInput.value = storedToken;
	}

	renderSummary();
});
