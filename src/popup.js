document.addEventListener("DOMContentLoaded", () => {

  const name = document.getElementById("name");
  const save = document.getElementById("save");

  const form = document.getElementById("form");
  // submission listener for window storage
  form.addEventListener("submit", (e) => {
    handleSave(document.getElementById("name").value);
  });

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
    window.close();
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