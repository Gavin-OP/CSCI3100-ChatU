// define comment schema
const mongoose = require('mongoose');


const commentSchema = mongoose.Schema({
    comment_id: { type: String, unique: true, required: true },
    user_id: { type: Number, required: true },
    comment_pub_time: { type: Date, required: true },
    comment_content: { type: String, required: true },
    tweet_id: { type: Number, required: true }
});


module.exports = mongoose.model('Comment', commentSchema);
