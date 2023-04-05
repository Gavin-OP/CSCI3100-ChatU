const express = require('express');
const app = express();

// need to import bodyParser to prevent req.body is undefined. 
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

// need to import cookieParser to prevent req.cookies is undefined. 
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// need to import cors to prevent CORS error.
const cors = require('cors');
app.use(cors());


const feedbackRoutes = require('./feedback')
const userRoutes = require('./user')
const followRoutes = require('./follow')
const fanRoutes = require('./fan')
// const tweetRoutes = require('./tweet')


app.use('/feedback', feedbackRoutes);
app.use('/user', userRoutes)
app.use('/follow', followRoutes)
app.use('/fan', fanRoutes)
// app.use('/tweet', tweetRoutes)

module.exports = app;
