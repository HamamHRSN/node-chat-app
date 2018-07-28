const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const moment = require('moment');
var {generateMessage, generateLocationMessage} = require('./utils/message.js');
var {isRealString} = require('./utils/validation.js');
var {Users} = require('./utils/users.js');


const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();

// const server = http.createServer((req, res) => {
// });
// using direct app on creating server give me the same request of the callback function (req, res)
const server = http.createServer(app); //=========================================================
const io = socketIO(server);
var users = new Users();

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
    // socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    // socket.broadcast.emit('newMessage', {
    //     from: 'Admin',
    //     text: 'New user joined',
    //     createdAt: new Date().getTime()
    // });

    // ---- Efter using a function generateMessage 
    // socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));
    


    
    socket.on('join', (params, callback) => {
         if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room name are required!');
         }

         socket.join(params.room);
         // socket.leave('The Office Fans');

         // io.emit -> io.to('The Office Fans').emit
         // socket.broadcast.emit -> socket.broadcast.to('The Office Fans').emit
         // socket.emit
         users.removeUser(socket.id);
         users.addUser(socket.id, params.name, params.room);
         
         io.to(params.room).emit('updateUsersList', users.getUserList(params.room));

         socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
         socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));
         callback();
    });

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
        // console.log('User was disconnected');

        var user = users.removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('updateUsersList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
        }
    });

});





// efter using http server using server not app for listening to the port
// app.listen(port, () => {
//     console.log(`Started up at port: ${port}`);
// });
server.listen(port, () => {
    console.log(`Started up at port: ${port}`);
}); // ============================================================================================


