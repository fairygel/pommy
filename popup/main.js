const response = document.querySelector("#response");
const tokenInput = document.querySelector("#token");
const showPasswordCheckbox = document.querySelector("#show-password");

showPasswordCheckbox.addEventListener("change", () => {
    tokenInput.type = showPasswordCheckbox.checked ? "text" : "password";
});

tokenInput.addEventListener("input", () => {
    localStorage.setItem("token", tokenInput.value);
});

if (localStorage.getItem("token")) tokenInput.value = localStorage.getItem("token");

response.textContent = "Generating Summary...";

fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-goog-api-key": tokenInput.value
  },
  body: JSON.stringify({
    contents: [
      {
        parts: [
          {
            text: "Explain how AI works in a few words"
          }
        ]
      }
    ]
  })
})
  .then(r => r.json())
  .then(data => {
    const text = data?.candidates?.[0]?.content?.parts
      ?.map(p => p.text ?? "")
      .join("\n")
      .trim();

      response.textContent = text || "No response";
  })
  .catch(err => {
    response.textContent = `error: ${err.message || err}`;
})
