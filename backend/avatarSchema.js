// define avatar schema
const mongoose = require('mongoose');


const avatarSchema = mongoose.Schema({
    user_id: { type: Number, unique: true },
    avatar_url: { type: String, default: '../avatar.png' },
});


module.exports = mongoose.model('Avatar', avatarSchema);