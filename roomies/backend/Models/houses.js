const mongoose = require('mongoose');

var house = new mongoose.Schema({
    houseNum: {String, trim:true},
    houseUsers:[],
    bills:[],
    chores:[]
});

var siteHouse = mongoose.model('siteUser',user);