var socket = io();

//   socket.on('connect', () => {
//       console.log('Connected to server');  
//   });           
//   socket.on('disconnect', () => {
//       console.log('Disconnected from server');
//   });

 socket.on('connect', function () {
      console.log('Connected to server');  

    //   socket.emit('newEmail', {
    //       to: "hamamhamou.hrsa@gmail.com",
    //       text: "Hey this is Hamam"
    //   });

      socket.emit('newMessage', {
        to: "Salma Hamou",
        text: "Yup! That is work for me",
    });
  });

  socket.on('disconnect', function () {
      console.log('Disconnected from server');
  });

//   socket.on('newEmail', function (email) {
//       console.log('New Email', email);
//   });


  socket.on('newMessage', function (message) {
    console.log('New Message', message);
});