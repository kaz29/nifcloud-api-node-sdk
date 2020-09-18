"use strict";
exports.__esModule = true;
var date_fns_1 = require("date-fns");
var date_fns_tz_1 = require("date-fns-tz");
var date = new Date()
console.log(date_fns_1.format(date, 'iii, dd MMM yy HH:mm:ss +0000'));


var xxx = new Date('Wed, 16 Sep 20 10:15:52 +0000')
console.log(xxx)
console.log(date_fns_tz_1.format(xxx, 'iii, dd MMM yy HH:mm:ss xxxx', { timeZone: 'UTC' }));
xxx = new Date(xxx.getTime() + xxx.getTimezoneOffset() * 60 * 1000)
console.log("xxx", date_fns_tz_1.format(xxx, 'iii, dd MMM yy HH:mm:ss xxxx', { timeZone: 'UTC' }));

console.log(date_fns_tz_1.format(date, 'iii, dd MMM yy HH:mm:ss xxxx', { timeZone: 'UTC' }));
console.log(date_fns_tz_1.format(date, 'iii, dd MMM yy HH:mm:ss xxxx', { timeZone: 'Asia/Tokyo' }));
console.log(date.getTimezoneOffset())
xxx = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000)
console.log(date_fns_tz_1.format(xxx, 'iii, dd MMM yy HH:mm:ss xxxx', { timeZone: 'UTC' }));

