[{
    id: '/#12poiajdspfoif',
    name: 'Hamam',
    room: 'The Office Fans'
}]


// addUser(id, name, room)
// removeUser(id)
// getUser(id)
// getUserList(room)


class Users {
     constructor () {
        this.users = [];
     }

     addUser (id, name, room) {
        var user = {id, name, room};
        this.users.push(user);
        return user;
     }

     removeUser (id) {
         //  return user that was removed
         //  return this.users.filter((user) => user.id === id)[0];
             var user = this.getUser(id);

             if (user) {
                 this.users = this.users.filter((user) => user.id !== id);
             }

             return user;
     }

     getUser (id) {
          return this.users.filter((user) => user.id === id)[0];
     }

     getUserList (room) {
        //   var users = this.users.filter((user) => {
        //       return user.room === room;
        //   })
        // short tecknic
        var users = this.users.filter((user) => user.room === room);
        var namesArray = users.map((user) => {
            return user.name;
        });

        return namesArray;
     }
}

module.exports = {Users};



// Docs  for Class
//=======================

// var users = [];

// var addUser = (id, name, room) => {
//     users.push({})
// };

// module.exports = {addUser};

// class Person {
//     constructor (name, age) {
//         // console.log('I am: ' + name, 'My age: ' + age);
//         this.name = name;
//         this.age = age;
//     }

//     getUsersDescription () {
//        return `${this.name} is ${this.age} year(s) old.`;
//     }
// }

// var me = new Person('Hamam', 34);
// // console.log('this.name ' + me.name);
// // console.log('this.age ' + me.age);

// var description = me.getUsersDescription();
// console.log(description);
