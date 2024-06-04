const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

// Set up the Express app and server
const app = express();
app.use(cors({ origin: '*' }));

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*", // your React app's URL
    methods: ["GET", "POST"],
    credentials: true
  }
});

app.get('/', (req, res) => {
  res.send('<h1>working fine</h1>');
});

const PORT = 3000;

io.on('connection', (socket) => {
  console.log('New client connected');

  // Example event to send notification
  socket.on('sendNotification', (message) => {
    console.log('Notification received: ', message);
    // Emit notification to all connected clients
    io.emit('receiveNotification', message);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
