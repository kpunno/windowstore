// send messages to service worker

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById('form');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(myForm);
    const name = formData.get('name');
    chrome.runtime.sendMessage({action: 'save', data: name});
  });
});
