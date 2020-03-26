const mongoose = require('mongoose');

var user = new mongoose.Schema({
    username: {String, trim:true},
    password: {String, trim:true},
    email: {String, trim:true},
    userNum: {Number,trim:true}
});

var siteUser = mongoose.model('siteUser',user);