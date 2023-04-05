// define Tweet schema
const mongoose = require('mongoose');


const tweetSchema = mongoose.Schema({
    tweet_id: { type: Number, unique: true, required: true },
    content: { type: String, required: true },
    user: { type: String, required: true },
    time: { type: Date, required: true, default: Date.now },
    original: { type: Number, default: -1 },
    privacy_state: { type: Boolean, required: true, default: false },
    image: [{
        data: Buffer,
        contentType: String
    }],
    like: [{ type: Number }],
    dislike: [{ type: Number }],
    tag: { type: String },
});


module.exports = mongoose.model('Tweet', tweetSchema);
