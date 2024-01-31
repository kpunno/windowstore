// append open button to side panel
// clicking prompts fetching data
// TODO: refactor to allow both the 'popup button' and 'sidepanel button' to fetch windows
document.addEventListener("DOMContentLoaded", () => {
  const div = document.getElementById("windows");

  // append 'open' button
  let button = document.createElement("button");
  button.textContent = "open";

  button = stylizeButton(button);

  button.addEventListener("click", () => {
    getWindowsFromStore();
  });

  div.appendChild(button);
});

chrome.runtime.onMessage.addListener(async (message) => {
  if (message.action == "get") {
    const contentLoad = await new Promise((resolve) => {
      if (
        document.readyState === "complete" ||
        document.readyState === "interactive"
      ) {
        resolve();
      } else {
        document.addEventListener("DOMContentLoaded", resolve);
      }
    });
    // once DOM is loaded, get
    getWindowsFromStore();
  }
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
    let button = document.createElement("button");
    button.textContent = key;

    button = stylizeButton(button);

    button.addEventListener("click", () => {
      console.log(`${key} was clicked.`);
    });

    div.appendChild(button);
    div.appendChild(document.createElement("br"));
  }
}

function stylizeButton(button) {
  button.classList.add("btn", "p-1", "m-1", "text-white");
  button.style = `
    width:100px; 
    background-color: 
    #ab00fe;`;
  return button;
}