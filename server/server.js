const express = require('express');
const socket = require('socket.io');

let shoppingArray = [];
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}


//app setup
const app = express();
const server = app.listen(port, () => console.log('Sever running on port '+port));

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
