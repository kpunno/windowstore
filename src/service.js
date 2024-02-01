chrome.runtime.onMessage.addListener((message, sender, response) => {
  if (message.action === "store") {
    getWindow(message.windowName);
    //
    // response({status: "received"});
    //
  }
});

// get last focused window
function getWindow(windowName) {
  // populate with tabs
  chrome.windows.getLastFocused({ populate: true }, (res) => {
    // pass name and response
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
  // spread operator? urls -> ...urls
  chrome.storage.sync.set({ [name]: { urls } }, () => {
    console.log("A new window was saved.");
  });
  //
  // TODO: define appropriate response after storage
  //
  chrome.storage.sync.get().then((result) => {
    console.log(result);
  });

  /*
  // CLEAR

  chrome.storage.sync.clear(() => {
    console.log("Synchronized storage was purged.");
  });
  chrome.storage.local.clear(() => {
    console.log("Local storage was purged.");
  });

  */
}
