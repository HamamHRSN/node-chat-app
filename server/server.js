const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');



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

//   socket.emit('newEmail');
// socket.emit('newEmail', {
//     from: "ro2a.hamou@gmail.com",
//     text: "Hey! What is going on.",
//     createdAt: 123
// });

socket.emit('newMessage', {
    from: "Naya Hamou",
    text: "Hey! See you then",
    createdAt: 123123
});


// socket.on('createEmail', (newEmail) => {
// console.log('createEmail', newEmail);
// });

socket.on('createMessage', (message) => {
    console.log('createMessage', message);
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


