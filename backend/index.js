const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Handle user joining a room
  socket.on('join_room', ({ roomCode, username }) => {
    console.log(`User ${username} is joining room ${roomCode}`);
    
    // Join the room
    socket.join('room' + roomCode);

    // Notify others in the room that a new user joined
    socket.to('room' + roomCode).emit('user_joined', `${username} has joined the room.`);
  });

  // Handle sending a message to a specific room
  socket.on('send_message', ({ roomCode, message , username }) => {
    console.log(`Message received in room ${roomCode}:`, message);
    
    // Broadcast message to everyone in the room (including sender)
    io.to('room' + roomCode).emit('receive_message', {message,username});
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

server.listen(8080, () => {
  console.log('Socket.IO server running on port 8080');
});
