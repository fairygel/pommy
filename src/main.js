import { AnalyzerService } from "./service/analyzer_service.js";
import { ApiKeyStorage } from "./storage/apikey_storage.js";

const responseElement = document.querySelector("#response");
const tokenInput = document.querySelector("#token");
const showPasswordCheckbox = document.querySelector("#show-password");
const settingsButton = document.querySelector("#settings-button");
const modal = document.querySelector("#settings-menu");
const modalCloseButton = document.querySelector("#settings-close-button");

const analyzerService = new AnalyzerService();
const apiKeyStorage = new ApiKeyStorage();

const MODAL_VISIBLE_CLASS = "show";
let tokenDirty = false;

function openModal() {
	if (!modal) return;
	modal.classList.add(MODAL_VISIBLE_CLASS);
	modal.setAttribute("aria-hidden", "false");
	hydrateTokenField();
}

function closeModal() {
	if (!modal) return;
	modal.classList.remove(MODAL_VISIBLE_CLASS);
	modal.setAttribute("aria-hidden", "true");
	if (tokenDirty) {
		tokenDirty = false;
		renderSummary();
	}
}

function hydrateTokenField() {
	if (!tokenInput) return;
	const storedToken = apiKeyStorage.getApiKey("GEMINI") || "";
	tokenInput.value = storedToken;
	tokenDirty = false;
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

if (settingsButton) {
	settingsButton.addEventListener("click", () => openModal());
}

if (modalCloseButton) {
	modalCloseButton.addEventListener("click", () => closeModal());
}

if (modal) {
	modal.addEventListener("click", (event) => {
		if (event.target === modal) {
			closeModal();
		}
	});
}

document.addEventListener("keydown", (event) => {
	if (event.key === "Escape") {
		closeModal();
	}
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
	hydrateTokenField();
	closeModal();
	renderSummary();
});
