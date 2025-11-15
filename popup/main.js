const response = document.querySelector("#response");
const tokenInput = document.querySelector("#token");

function random(number) {
  return Math.floor(Math.random() * number);
}

tokenInput.addEventListener("input", () => {
    response.textContent = tokenInput.value + random(1000);
});