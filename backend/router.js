const express = require('express');
const app = express();
// need to import bodyParser to prevent req.body is undefined. 
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

const feedbackRoutes = require('./feedbacks')
app.use('/feedback', feedbackRoutes);

module.exports = app;
