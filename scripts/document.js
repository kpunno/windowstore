document.addEventListener("DOMContentLoaded", () => {
  
  // get form data
  const form = document.getElementById('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();    
    handleSave(
      document.getElementById('name').value  
    );
  })
});

// notify service worker, give window name
function handleSave(windowName) {
  // send message to service worker that save action was triggered
  chrome.runtime.sendMessage({ 
    action: "store", 
    windowName: windowName
  });
}
