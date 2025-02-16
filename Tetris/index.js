const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const server = http.createServer(app);
const { Server } = require ("socket.io");
const io = new Server (server);

// Tetris high score
var tetrisHighScore = [0, 'Anonymous'];

console.log(__dirname);

app.use(express.static(path.join(__dirname, 'Public')));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/Public/game.html');
});

io.on ('connection', (socket) => {

    // User has connected to tetris
    socket.on('tetrisConnect', () => {
        console.log("User has connected to tetris!");
        io.emit('Tetris High Score', tetrisHighScore);
    });

    // User beat high score
    socket.on('newHighScore', (score) => {
        tetrisHighScore = score;
        io.emit('Tetris High Score', tetrisHighScore);
    });

});

server.listen(3000, () => {
  console.log('listening on *:3000');
  
});

