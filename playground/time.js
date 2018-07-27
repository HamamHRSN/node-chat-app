const moment = require('moment');

// jan 1st 1970 00:00:00 am
// var date = new Date();
// console.log(date.getMonth());

// var date = moment();
// console.log(date);
// console.log(date.format());
// console.log(date.format('MMM'));
// console.log(date.format('Y-M-D'));
// date.add(7, 'year').subtract(9, 'months').year(2009).hours(0).minutes(0).seconds(0);
// console.log(date.format('MMM Do YYYY'));
// console.log(date.format('h:mm a'));
// console.log(date.format('LT'));



var someTimeStamp = moment().valueOf()
console.log(someTimeStamp);


var createdAt = 1234;
var date = moment(createdAt);
console.log(date.format('h:mm a'));




