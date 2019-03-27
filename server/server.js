const express = require('express');
const socket = require('socket.io');

let shoppingArray = [];


//app setup
const app = express();
const server = app.listen(process.env.PORT || 3000, () => {
    console.log("server listening");
});

//static files
app.use(express.static('public'));

//socket setup
const io = socket(server);

io.on('connection', (socket) => {
    console.log('socket connection successful', );

    socket.on('chat', (data) =>{
        io.sockets.emit('chat', data);
        shoppingArray.push(data);
    });

    socket.on('typing', (data) =>{
        socket.broadcast.emit('typing', data);
    });

    socket.on('remove', (data) =>{
        io.sockets.emit('remove', data);
        console.log(data)
    });
});