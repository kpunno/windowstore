// true -> clear storage after next save
// DEV ONLY
const _CLEAR_ = false;

// listens for the save message (sent by src/popup.js)
chrome.runtime.onMessage.addListener((message, sender, response) => {
  if (message.action === "save") {
    getWindow(message.windowName);
  }
});

// get last focused window
function getWindow(windowName) {
  // populate with tabs
  chrome.windows.getLastFocused({ populate: true }, (res) => {
      storeWindow(windowName, res);
  });
}

// store urls in sync storage
function storeWindow(name, res) {
  urls = []
  res.tabs.forEach((tab) => {
    urls.push(tab.url);
  });
  
  chrome.storage.sync.set({ [name]: { urls } }, () => {
    console.log("A new window was saved.");
  });

  // inform sidepanel to update list
  chrome.runtime.sendMessage({action: "update"});

  //
  // DEV ONLY
  //
  if (_CLEAR_ === true) CLEAR_STORAGE();
}

function openWindow() {
  
}

//
// DEV ONLY
// purge all items in storage
//
function CLEAR_STORAGE() {
  chrome.storage.sync.clear(() => {
    console.log("Synchronized storage was purged.");
  });
  chrome.storage.local.clear(() => {
    console.log("Local storage was purged.");
  });
}