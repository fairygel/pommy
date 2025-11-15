function collectPageContent() {
  const title = document.title;
  const bodyText = document.body.innerText;
  return { title, bodyText };
}

browser.runtime.onMessage.addListener((message) => {
  if (message.type === "GET_PAGE_CONTENT") {
    return Promise.resolve(collectPageContent());
  }
});