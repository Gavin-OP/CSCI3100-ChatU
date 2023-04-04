// define Tweet schema
const mongoose = require('mongoose');


const tweetSchema = mongoose.Schema({
    tweet_id: { type: Number, unique: true, required: true },
    tweet_content: { type: String, required: true },
    tweet_img: [{
        data: Buffer,
        contentType: String
    }],
    tweet_pub_time: { type: Date, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    comment: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    like: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    dislike: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    privacy_state: { type: Boolean, required: true },
    original_tweet: { type: mongoose.Schema.Types.ObjectId, ref: 'Tweet' },
    tag: { type: String },
});


module.exports = mongoose.model('Tweet', tweetSchema);
