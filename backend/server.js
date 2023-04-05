const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.static('app'));

const cors = require('cors');
app.use(cors());

const router = require('./router')


// connect to database
mongoose.connect('mongodb+srv://Gavin:GaICBvZZbtJbWdEB@csci3100-chatu.txywakd.mongodb.net/test');
const db = mongoose.connection;
db.once('open', () => {
    console.log('DB connection successful');
    console.log('Server is online. ')
    app.use('/', router);
});

// start the server
server = app.listen(5555);