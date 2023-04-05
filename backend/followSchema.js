// define follow schema
const mongoose = require('mongoose');


const followSchema = mongoose.Schema({
    user_id: { type: Number },
    follow_id: [{ type: Number }],
});


module.exports = mongoose.model('Follow', followSchema);