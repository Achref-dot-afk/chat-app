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

// Handle incoming socket connections
io.on('connection', (socket) => {
  console.log('A user connected.');

  // Listen for incoming messages
  socket.on('chat message', (message) => {
    // Broadcast the message to all connected clients
    socket.broadcast.emit('chat message', message);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected.');
  });
});
// Start the server
server.listen(3000, () => {
  console.log(`Server listening on port 3000.`);
});
