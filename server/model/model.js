const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    username : {
        type : String,
        required: true
    },
    password : {
        type: String,
        required: true,
        unique: true
    },
    car: Array

})

const Userdb = mongoose.model('userdb', schema);

module.exports = Userdb;