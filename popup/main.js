const response = document.querySelector("#response");
const tokenInput = document.querySelector("#token");
const showPasswordCheckbox = document.querySelector("#show-password");

showPasswordCheckbox.addEventListener("change", () => {
	tokenInput.type = showPasswordCheckbox.checked ? "text" : "password";
});

tokenInput.addEventListener("input", () => {
	localStorage.setItem("token", tokenInput.value);
});

if (localStorage.getItem("token"))
	tokenInput.value = localStorage.getItem("token");

async function getActiveTabContent() {
	const [tab] = await browser.tabs.query({
		active: true,
		currentWindow: true,
	});
	if (!tab?.id) throw new Error("No Active Tab");

	return browser.tabs.sendMessage(tab.id, { type: "GET_PAGE_CONTENT" });
}

function runSummary(pageData) {
	response.textContent = "Generating Summary...";

	fetch(
		"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"x-goog-api-key": tokenInput.value,
			},
			body: JSON.stringify({
				contents: [
					{
						parts: [
							{
								text:
									"Make a short summary about what you seen on this page: " +
									pageData,
							},
						],
					},
				],
			}),
		}
	)
		.then((r) => r.json())
		.then((data) => {
			const text = data?.candidates?.[0]?.content?.parts
				?.map((p) => p.text ?? "")
				.join("\n")
				.trim();

			response.textContent = text || "No response";
		})
		.catch((err) => {
			response.textContent = `error: ${err.message || err}`;
		});
}

document.addEventListener("DOMContentLoaded", async () => {
	try {
		const tempData = await getActiveTabContent();
		runSummary(tempData.bodyText || "Empty");
	} catch (err) {
		response.textContent = `Can not get data: ${err.message}`;
	}
});
