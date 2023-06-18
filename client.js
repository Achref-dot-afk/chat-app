document.addEventListener('DOMContentLoaded', () => {
const socket = io();

// Receive and display messages

socket.on('chat message', (message) => {
  createblock(message);
}
);


// Handle form submission
document.getElementById('chat-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const messageInput = document.getElementById('message-input');
  const message = messageInput.value.trim();
  if (message !== '') {
    // Send the message to the server
    socket.emit('chat message', message);
    messageInput.value = '';
    createblock(message);
  }
});

function createblock(message){
    var block = document.createElement('div');
    block.id = 'message';
    block.innerText = message;
    document.getElementById('chat').appendChild(block);

}

});


