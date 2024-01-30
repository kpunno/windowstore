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

chrome.runtime.onMessage.addListener((message) => {
    if (message.action === 'store') {
        // get window that triggered save action
        getWindow(message.windowName);
    }
})

// get last focused window
function getWindow(windowName) {
    chrome.windows.getLastFocused({populate: true}, res => {
        // store URLs of last focused window's tabs
        storeWindow(windowName, res)
    });
}

// store urls in local storage
function storeWindow(name, res) {
    // extract URLs
    urls = []
    res.tabs.forEach(tab => {
        urls.push(tab.url)
    })
    chrome.storage.sync.set({name, urls}, () => {
        console.log("A new window was saved.");
    })
    //
    // TODO: define appropriate response after storage
    //
    chrome.storage.sync.get().then((result) => {
        console.log(result);
    })
    chrome.storage.local.clear(() => {
        console.log("Storage was purged.");
    })
}
