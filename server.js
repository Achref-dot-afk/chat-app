const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// Serve static files
app.use(express.static(__dirname + '/public'));

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
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
