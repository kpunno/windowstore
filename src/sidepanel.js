// get from store, continue to load elements
function getWindowsFromStore() {
  chrome.storage.sync.get().then((windows) => {
    loadElements(windows);
  });
}

// find in store, open window
function openWindow(urls) {
  chrome.windows.create({url: urls}, () => {});
}

// first, load contents of side panel
document.addEventListener("DOMContentLoaded", () => {
  getWindowsFromStore();
});

// listen for storage updates, send by src/service.js
chrome.runtime.onMessage.addListener((message, sender, response) => {
  if (message.action === "update") {
    getWindowsFromStore();
  }
});

// notify service worker, give window name
function handleDelete(windowName) {
  // send message to service worker that save action was triggered
  chrome.runtime.sendMessage({
    action: "delete",
    windowName: windowName,
  });
}

// append restorable windows as buttons to side panel
function loadElements(data) {
  const div = document.getElementById("windows");
  div.innerHTML = "";

  for (key in data) {
    // button, tab count are children of a span
    let span = document.createElement("span");
    let button = document.createElement("button");
    let badge = document.createElement("span");
    let deleteBtn = document.createElement("button");
    // set button content, style
    button.textContent = key;
    button = styleNameButton(button);
    // set badge content, style
    badge.textContent = `${data[key].urls.length}`;
    badge = styleTabCountBadge(badge);
    // set delete button content
    deleteBtn.textContent="X";
    deleteBtn.classList.add("btn-delete");
    // append children
    span.appendChild(button);
    span.appendChild(badge);
    span.appendChild(deleteBtn);
    div.appendChild(span);
    div.appendChild(document.createElement("br"));

    // clickable event to restore window
    button.addEventListener("click", (key => {
      return () => {
        // Open the window by the URLs
        openWindow(data[key].urls);
      }
    })(key));

    deleteBtn.addEventListener("click", (key => {
      return () => {
        handleDelete(key);
      }
    })(key));
  }
}

// style the button
function styleNameButton(button) {
  button.classList.add("btn-shadowed", "btn-sidepanel");
  return button;
}

// style the badge
function styleTabCountBadge(badge) {
  badge.classList.add("badge-shadowed");
  return badge;
}
