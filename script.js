
let tabs = [];

document.addEventListener("DOMContentLoaded", async function () {
  script();
});

async function saveTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);

  console.log(tab.url);
}

chrome.tabs.onRemoved.addListener(function (tabId, removeInfo) {
    console.log('Tab removed:', tabId, removeInfo);
    const tab = chrome.tabs.find(tabId);
    removeTab(tab);
  });

// could be sorted
function pushTab(tab) {
    // push url to array
    tabs.push(tab);
}

function removeTab(tab) {
    // find tab by Id
    // pop from tabs array
    tabs.find(tab.tabId).pop();
}