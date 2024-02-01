/*
// listener's callback auto-parameterized with current tab object
chrome.tabs.onCreated.addListener((tab) => {
    console.log(tab.id);
})

// listener's callback auto-parameterized with current tab ID
chrome.tabs.onRemoved.addListener((tabId) => {
    console.log(tabId);
})
*/

const RESET_STORAGE = false;

chrome.runtime.onMessage.addListener((message, sender, response) => {
  if (message.action === "store") {
    // get window that triggered save action
    getWindow(message.windowName);
    //
    // response({status: "received"});
    //
  }
});

// get last focused window
function getWindow(windowName) {
  chrome.windows.getLastFocused({ populate: true }, (res) => {
    // store URLs of last focused window's tabs
    storeWindow(windowName, res);
  });
}

// store urls in local storage
function storeWindow(name, res) {
  // extract URLs
  urls = [];
  res.tabs.forEach((tab) => {
    urls.push(tab.url);
  });
  chrome.storage.sync.set({ [name]: {urls} }, () => {
    console.log("A new window was saved.");
  });
  //
  // TODO: define appropriate response after storage
  //
  chrome.storage.sync.get().then((result) => {
    console.log(result);
  });

  if (RESET_STORAGE == true) {
    chrome.storage.sync.clear(() => {
      console.log("Synchronized storage was purged.");
    });
    chrome.storage.local.clear(() => {
      console.log("Local storage was purged.");
    });
  }
}
