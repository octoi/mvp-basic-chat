const path = require('path');
const express = require('express');
const socketIo = require('socket.io');

const app = express();
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'))
})

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`[+] server running at http://localhost:${port}`);
})

const io = socketIo(server);

const users = {};

io.on('connection', (socket) => {
  console.log(`[+] ${socket.id} connected`)

  socket.on('join-room', (username) => {
    socket.join('chat');
    users[socket.id] = username;
    socket.broadcast.emit('message', {
      sender: 'SERVER ✅',
      message: `${username} has hoped into server 🥳`
    })
  })

  socket.on('message', (username, message) => {
    io.emit('message', {
      sender: `${username}`,
      message
    })
  });

  socket.on('disconnect', () => {
    const user = users[socket.id];
    socket.broadcast.emit('message', {
      sender: 'SERVER ✅',
      message: `${user} left the chat 🚶‍♂️`
    })
    delete users[socket.id];
  })
})
