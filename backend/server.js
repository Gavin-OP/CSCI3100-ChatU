const express = require('express');
const app = express();
app.use(express.static('app'));

const mongoose = require('mongoose');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
const cors = require('cors');
app.use(cors());

console.log('Server is online. ')

server = app.listen(5000);