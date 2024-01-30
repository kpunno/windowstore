
let name;

// listen for tab on activated
// possibly not needed

// listener's callback auto-parameterized with current tab object
chrome.tabs.onCreated.addListener((tab) => {
    console.log(tab.id);
})

// listener's callback auto-parameterized with current tab ID
chrome.tabs.onRemoved.addListener((tabId) => {
    console.log(tabId);
})

chrome.runtime.onMessage.addListener((message, data) => {
    if (message.action === 'save') {
        getWindow(data.name);
        // save logic
    }
})

// get currently open tabs
function getWindow(name) {
    chrome.windows.getCurrent({populate: true},(window) => storeWindow(window))
}

// save session
function storeWindow(window) {
    const name = name;
    chrome.storage.sync.set({window: {name: name, window: window}}, () => {
        console.log("set window.")
    })
    chrome.storage.sync.get().then((result) => {
        console.log(result);
    })
}
