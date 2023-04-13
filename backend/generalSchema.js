// define general schema
const mongoose = require('mongoose');


const generalSchema = mongoose.Schema({
    user_cnt: { type: Number, default: 0 },
    tweet_cnt: { type: Number, default: 0 },
    comment_cnt: { type: Number, default: 0 },
});


module.exports = mongoose.model('General', generalSchema);