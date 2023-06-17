const socket = io("http://localhost:3000");

// Receive and display messages
socket.on('chat message', (message) => {
  const block = document.createElement('div');
  block.classList.add('block');
  block.innerText = message;
  document.getElementById('chat').appendChild(block);
});

// Handle form submission
document.getElementById('chat-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const messageInput = document.getElementById('message-input');
  const message = messageInput.value.trim();
  if (message !== '') {
    // Send the message to the server
    socket.emit('chat message', message);
    messageInput.value = '';
  }
});
