document.addEventListener("DOMContentLoaded", () => {

  // submission listener for window storage
  document.getElementById("form").addEventListener("submit", (e) => {
    e.preventDefault();
    handleSave(document.getElementById("name").value);
  });

  const name = document.getElementById("name");
  const save = document.getElementById("save");

  name.addEventListener("input", (e) => {
    if (name.value === "" || name.value.length > 20) {
      save.disabled = true;
    } else {
      save.disabled = false;
    }
  })

  // open the side panel
  const openBtn = document.getElementById("open");
  openBtn.addEventListener("click", function () {
    // get last focused window
    chrome.windows.getLastFocused({}, (window) => {
      // open the side panel for the currently focused window
      chrome.sidePanel.open({ windowId: window.id }, () => {
        // send for src/sidepanel.js to receive saved windows
        chrome.runtime.sendMessage({action: "get"});
      });
    });
  });
});

// notify service worker, give window name
function handleSave(windowName) {
  // send message to service worker that save action was triggered
  chrome.runtime.sendMessage({
    action: "save",
    windowName: windowName,
  });
}