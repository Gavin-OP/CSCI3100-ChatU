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
const blacklistRoutes = require('./blacklist')
const adminRoutes = require('./admin')
const tweetRoutes = require('./tweet')
const fovoriteRoutes = require('./favorite')



app.use('/feedback', feedbackRoutes)
app.use('/user', userRoutes)
app.use('/follow', followRoutes)
app.use('/fan', fanRoutes)
app.use('/blacklist', blacklistRoutes)
app.use('/admin', adminRoutes)
app.use('/tweet', tweetRoutes)
app.use('/favorite', fovoriteRoutes)

module.exports = app;
