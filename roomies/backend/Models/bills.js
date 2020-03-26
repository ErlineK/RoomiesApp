const mongoose = require('mongoose');

var bill = new mongoose.Schema({
    billNumber:{string, trim:true},
    houseNum:{string, trim:true},
    type:{string,trim:true},
    users:[]
});

var siteBill = mongoose.model('siteUser',user);