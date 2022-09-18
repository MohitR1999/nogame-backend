const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const cors = require('cors');

const { Server } = require('socket.io');
const io = new Server(server, {
    cors: {
        origin : 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});

app.use(cors());

const PORT = 4000;

app.get('/', (request, response) => {
    response.send(`<h1>Hello World</h1>`);
});

io.on('connection', (socket) => {
    console.log(`A user connected, ${socket.id}`);

    socket.on('ping', (msg) => {
        console.log(msg);
        io.emit('pong', msg);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    })
})

server.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
})