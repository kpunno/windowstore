
// first, load contents of side panel
document.addEventListener("DOMContentLoaded", () => {
  getWindowsFromStore();
});

// get from store, continue to load elements
function getWindowsFromStore() {
  chrome.storage.sync.get().then((windows) => {
    loadElements(windows);
    console.log(windows);
  });
}

// append restorable windows as buttons to side panel
function loadElements(data) {
  const div = document.getElementById("windows");

  for (key in data) {
    // button, tab count are children of a span
    let span = document.createElement("span");
    let button = document.createElement("button");
    let badge = document.createElement("span");
    // set button content, style
    button.textContent = key;
    button = styleNameButton(button);
    
    // set badge content, style
    badge.textContent = `${data[key].urls.length}`
    badge = styleTabCountBadge(badge);

    // append children
    span.appendChild(button);
    span.appendChild(badge);
    div.appendChild(span);
    div.appendChild(document.createElement("br"));
    
    // clickable event to restore window
    button.addEventListener("click", () => {
      //
      // TODO: REOPEN WINDOW
      //
      console.log(`${key} was clicked.`);
    });
  }
}

// style the button
function styleNameButton(button) {
  button.classList.add("btn-shadowed");
  return button;
}

// style the badge
function styleTabCountBadge(badge) {
  badge.classList.add("badge-shadowed");
  return badge;
}
