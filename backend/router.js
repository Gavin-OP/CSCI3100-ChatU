const express = require('express');
const app = express();

// need to import bodyParser to prevent req.body is undefined. 
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const feedbackRoutes = require('./feedback')
const userRoutes = require('./user')


app.use('/feedback', feedbackRoutes);
app.use('/user', userRoutes)

module.exports = app;
