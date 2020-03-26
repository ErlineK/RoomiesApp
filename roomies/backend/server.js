const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
//const dotenv = require('dotenv'); to be used later to keep connection and password private
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
    console.log('Server is running');
})

mongoose.connect('mongodb+srv://mike:Fanshawe@roomies-7l50t.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser:true});// To be changed with dotenv

var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error'));
db.once('open', () =>{
    console.log('Connected');
});


