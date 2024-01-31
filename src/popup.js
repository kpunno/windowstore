document.addEventListener("DOMContentLoaded", () => {

  // submission listener for window storage
  document.getElementById("form").addEventListener("submit", (e) => {
    e.preventDefault();
    handleSave(document.getElementById("name").value);
  });

  // open listener for side panel options
  const openBtn = document.getElementById("open");
  openBtn.addEventListener("click", function () {
    //
    // restore session of (selectedValue)
    //
    chrome.windows.getLastFocused({}, (window) => {
      chrome.sidePanel.open({ windowId: window.id }, () => {
        chrome.runtime.sendMessage({action: "get"});
      });
    });
  });
});

// notify service worker, give window name
function handleSave(windowName) {
  // send message to service worker that save action was triggered
  chrome.runtime.sendMessage({
    action: "store",
    windowName: windowName,
  });
}

// Ex: func showWindows() {
// get target element
// targetE.forEach(funcscript) -> defined outside of scope
//      // logic to create html elements
// }
//
