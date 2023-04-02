// define user schema
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    user_id: { type: Number, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    pwd: { type: String, required: true },
    username: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);

