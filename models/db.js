var settings = require('../settings');
var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;

module.exports = "mongodb://admin:123456@localhost:27017/admin"
console.log("Connected");