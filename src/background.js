const MIRROR = "https://freedium-mirror.cfd";

chrome.action.onClicked.addListener((tab) => {
  if (!tab?.id || !tab.url) return;

  const url = new URL(tab.url);
  chrome.tabs.update(tab.id, {
    url: MIRROR + url.pathname + url.search,
  });
});
