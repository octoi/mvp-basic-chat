const http = require('http');
const path = require('path');
const express = require('express');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'))
})

io.on('connection', (socket) => {
  console.log(`[+] ${socket.id} connected`)

  socket.on('join-room', () => {

  })
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`[+] server running at http://localhost:${port}`);
})