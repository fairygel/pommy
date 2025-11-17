import { AnalyzerService } from "./service/analyzer_service.js";
import { ApiKeyStorage } from "./storage/apikey_storage.js";
import { PromptStorage } from "./storage/prompt_storage.js";

const responseElement = document.querySelector("#response");
const tokenInput = document.querySelector("#token");
const promptInput = document.querySelector("#prompt");
const showPasswordCheckbox = document.querySelector("#show-password");
const settingsButton = document.querySelector("#settings-button");
const settingsMenu = document.querySelector("#settings-menu");
const settingsCloseButton = document.querySelector("#settings-close-button");

const analyzerService = new AnalyzerService();
const apiKeyStorage = new ApiKeyStorage();
const promptStorage = new PromptStorage();

const SETTINGS_VISIBLE_CLASS = "show";

let tokenDirty = false;
let promptDirty = false;

function openSettings() {
	if (!settingsMenu) return;
	settingsMenu.classList.add(SETTINGS_VISIBLE_CLASS);
	settingsMenu.setAttribute("aria-hidden", "false");
	hydrateTokenField();
}

function closeSettings() {
	if (!settingsMenu) return;
	settingsMenu.classList.remove(SETTINGS_VISIBLE_CLASS);
	settingsMenu.setAttribute("aria-hidden", "true");
	if (tokenDirty || promptDirty) {
		tokenDirty = false;
		promptDirty = false;
		renderSummary();
	}
}

function hydrateTokenField() {
	if (!tokenInput) return;
	const storedToken = apiKeyStorage.getApiKey("GEMINI") || "";
	tokenInput.value = storedToken;
	tokenDirty = false;

	if (!promptInput) return;
	const storedPrompt = promptStorage.getPrompt() || "";
	promptInput.value = storedPrompt;
	promptDirty = false;
}

if (showPasswordCheckbox && tokenInput) {
	showPasswordCheckbox.addEventListener("change", () => {
		tokenInput.type = showPasswordCheckbox.checked ? "text" : "password";
	});
}

if (tokenInput) {
	tokenInput.addEventListener("input", () => {
		const trimmed = tokenInput.value.trim();
		apiKeyStorage.setApiKey("GEMINI", trimmed);
		tokenDirty = true;
	});
}

if (promptInput) {
  promptInput.addEventListener("input", () => {
		const trimmed = promptInput.value.trim();
		promptStorage.setPrompt(trimmed);
		promptDirty = true;
	});
}

if (settingsButton) {
	settingsButton.addEventListener("click", () => openSettings());
}

if (settingsCloseButton) {
	settingsCloseButton.addEventListener("click", () => closeSettings());
}

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
	hydrateTokenField();
	closeSettings();
	renderSummary();
});
