const response = document.querySelector("#response");

function random(number) {
  return Math.floor(Math.random() * number);
}

response.textContent = random(10);