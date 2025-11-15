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