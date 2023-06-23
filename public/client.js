document.addEventListener('DOMContentLoaded', () => {
const socket = io();
document.getElementById('chat-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const messageInput = document.getElementById('message-input');
  const message = messageInput.value.trim();
  if (message !== '') {
    // Send the message to the server
    socket.emit('chat message', message);
    messageInput.value = '';
    createblock(message, username);
  }
});

socket.on('chat message', obj => {
  createblock(obj.message,obj.username);
});

socket.emit("user-join",username);

socket.on('user-connected',(name) => {
  createconnectionblock( `${name} connected `);
  addusertolist(name);
});
socket.on('user-disconnected',(name) => {
  createconnectionblock( `${name} disconnected `);
  removeuser(name);
});

function createblock(message,username){
    var block = document.createElement('div');
    var label = document.createElement('div');
    block.id = 'message';
    block.innerText = message;
    document.getElementById('chat').appendChild(block);
    block.style.backgroundColor = 'lightblue';
    block.style.borderRadius = '3px';
    block.style.padding = '14px';
    block.style.paddingTop = '20px';;
    block.style.margin = '4px';
    block.style.width = '800px'
    block.appendChild(label);
    label.style.color = 'blue';
    label.innerText = username;
    //make the label above the message
    label.style.position = 'relative';
    label.style.bottom = '35px';
    label.style.fontSize = '10px';
    label.style.fontWeight = 'bold';
    label.style.fontFamily = 'sans-serif';
    label.style.textTransform = 'uppercase';
    label.style.letterSpacing = '1px';
    //add time behin the label
    var time = document.createElement('div');
    block.appendChild(time);
    time.innerText = new Date().toLocaleTimeString() + ' pm';
    time.style.color = 'grey';
    time.style.fontSize = '10px';
    time.style.fontFamily = 'sans-serif';
    time.style.bottom = '47px';
    time.style.position = 'relative';
    time.style.left = '50px';

}
function createconnectionblock(message){
  var block = document.createElement('div');
  block.innerText = message;
  document.getElementById('chat').appendChild(block);
  block.style.backgroundColor = '#fff';
  block.style.display = 'flex';
  block.style.justifyContent = 'center';
  block.style.fontFamily = 'sans-serif';
  block.style.color = 'grey';
}

function addusertolist(username)
{
  const block = document.createElement('div');
  block.id = username;
  block.innerText = username;
  //design the block
  block.style.backgroundColor = 'rgb(126, 55, 242)';
  block.style.borderRadius = '3px';
  block.style.padding = '14px';
  block.style.paddingTop = '14px';;
  block.style.width = '253px'
  block.fontFamily = 'sans-serif';
  block.style.color = 'white';
  block.style.textAlign = 'center';
  block.style.border = '1px solid #fff';
  block.style.borderLeft = '0px';
  block.style.borderRight = '0px';
  document.getElementById('accounts').style.overflowY = 'scroll';
  document.getElementById('accounts').appendChild(block);
}


function removeuser(username){
  document.getElementById('accounts').removeChild(document.getElementById(username));
}

});