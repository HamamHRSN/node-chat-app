const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
var {generateMessage, generateLocationMessage} = require('./utils/message.js');


const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();

// const server = http.createServer((req, res) => {
// });
// using direct app on creating server give me the same request of the callback function (req, res)
const server = http.createServer(app); //=========================================================
const io = socketIO(server);

// console.log(__dirname + '/../public');
// console.log(publicPath);
app.use(express.static(publicPath)); 



io.on('connection', (socket) => {
  console.log('New user connected');


    // socket.emit('newMessage', {
    //     from: 'Admin',
    //     text: 'Welcome to chat app',
    //     createdAt: new Date().getTime()
    // });

    // ---- Efter using a function generateMessage 
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    // socket.broadcast.emit('newMessage', {
    //     from: 'Admin',
    //     text: 'New user joined',
    //     createdAt: new Date().getTime()
    // });

    // ---- Efter using a function generateMessage 
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));


    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);

        // io.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
        io.emit('newMessage', generateMessage(message.from, message.text));
        // callback('This is from the server.');
        callback();

        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
    });

    // socket.on('createLocationMessage', (coords) => {
    //     io.emit('newMessage', generateMessage('Admin', `${coords.latitude}, ${coords.longitude}`));
    // });
    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });


    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });

});





// efter using http server using server not app for listening to the port
// app.listen(port, () => {
//     console.log(`Started up at port: ${port}`);
// });
server.listen(port, () => {
    console.log(`Started up at port: ${port}`);
}); // ============================================================================================


