const express = require('express');
const socket = require('socket.io');

let shoppingArray = [];
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}



//app setup
const app = express();
<<<<<<< HEAD
const server = app.listen(process.env.PORT || 3000, () => {
    console.log("server listening");
});
=======
const server = app.listen(port, () => console.log('Sever running on port '+port));
>>>>>>> 66d7637c9956b3a1006e25a2b09de39e9de21bc5

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
