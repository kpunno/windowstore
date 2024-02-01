// append open button to side panel
// clicking prompts fetching data
// TODO: refactor to allow both the 'popup button' and 'sidepanel button' to fetch windows
document.addEventListener("DOMContentLoaded", () => {
  getWindowsFromStore();
});

function getWindowsFromStore() {
  chrome.storage.sync.get().then((data) => {
    loadElements(data);
  });
}

function loadElements(data) {
  const div = document.getElementById("windows");

  // remove obsolete data
  while (div.firstChild) {
    div.removeChild(div.firstChild);
  }

  // temp for tests
  // iterate through objects held in store
  for (key in data) {
    console.log(key); // name
    console.log(data[key].urls); // url array
  }

  // iterate through objects held in store
  for (key in data) {
    let span = document.createElement("span");

    let button = document.createElement("button");
    button.textContent = key;
    button = styleNameButton(button);
    button.addEventListener("click", () => {
      //
      // TODO: REOPEN WINDOW
      //
      console.log(`${key} was clicked.`);
    });
    let badge = document.createElement("span");
    badge.textContent = `${data[key].urls.length} tabs `
    badge = styleTabCountBadge(badge);
    span.appendChild(button);
    span.appendChild(badge);
    div.appendChild(span);
    div.appendChild(document.createElement("br"));
    
  }
}

function styleNameButton(button) {
  button.classList.add("btn", "p-0", "m-2");
  button.style = `
    width:100px; 
    background-color: #b1b7f7;
    color: #150F7A;
    `;
  return button;
}

function styleTabCountBadge(badge) {
  badge.style = `color: #555baa;`;
  badge.classList.add(
    "badge","bg-light", "p-1", "m-1", "rounded-pill"
    );
  return badge;
}
