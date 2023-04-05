// define comment schema
const mongoose = require('mongoose');


const commentSchema = mongoose.Schema({
    comment_id: { type: String, unique: true, required: true },
    tweet_id: { type: Number, required: true },
    user_id: { type: Number, required: true },
    time: { type: Date, required: true, default: Date.now },
    content: { type: String, required: true },
});


module.exports = mongoose.model('Comment', commentSchema);
