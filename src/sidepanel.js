
// first, load contents of side panel
document.addEventListener("DOMContentLoaded", () => {
  getWindowsFromStore();
});

// get from store, continue to load elements
function getWindowsFromStore() {
  chrome.storage.sync.get().then((windows) => {
    loadElements(windows);
  });
}

// append restorable windows as buttons to side panel
function loadElements(windows) {
  const div = document.getElementById("windows");

  for (window in windows) {
    // button, tab count are children of a span
    let span = document.createElement("span");
    let button = document.createElement("button");
    let badge = document.createElement("span");
    
    // set button content, style
    button.textContent = window;
    button = styleNameButton(button);
    
    // set badge content, style
    badge.textContent = `${windows[window].urls.length} tabs `
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
      console.log(`${window} was clicked.`);
    });
  }
}

// style the button
function styleNameButton(button) {
  button.classList.add("btn", "p-0", "m-2");
  button.style = `
    width:100px; 
    background-color: #b1b7f7;
    color: #150F7A;
    `;
  return button;
}

// style the badge
function styleTabCountBadge(badge) {
  badge.style = `color: #555baa;`;
  badge.classList.add(
    "badge","bg-light", "p-1", "m-1", "rounded-pill"
    );
  return badge;
}
