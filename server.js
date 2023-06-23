const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
//connect to database 
mongoose.connect('mongodb://127.0.0.1:27017/chat')
.then(() => {
    console.log('Connected to database');
})
.catch((err) => {
    console.log('Error connecting to database');
    console.log(err);   
});


// Serve static files
app.use(express.static('public'));
app.get('/', (_, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});
const server = require('http').createServer(app);
const io = require('socket.io')(server);
app.get('/chat', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/chat.html'));
});

const users = {}
// Handle incoming socket connections
io.on('connection', (socket) => {


  // Listen for incoming messages
  socket.on('user-join',(username) => {
    users[socket.id] = username ;
    socket.broadcast.emit('user-connected',username);
  });
  socket.on('chat message', message => {
    const obj = { message: message , username: users[socket.id] };
    socket.broadcast.emit('chat message', obj);
  });
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected',users[socket.id]);
  });

});
// Start the server
server.listen(3000, () => {
  console.log(`Server listening on port 3000.`);
});
