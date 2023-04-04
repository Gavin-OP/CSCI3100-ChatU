// define Tweet schema
const mongoose = require('mongoose');


const tweetSchema = mongoose.Schema({
    tweet_id: { type: Number, unique: true, required: true },
    content: { type: String, required: true },
    image: [{
        data: Buffer,
        contentType: String
    }],
    time: { type: Date, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    comment: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    like: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    dislike: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    privacy_state: { type: Boolean, required: true },
    original: { type: mongoose.Schema.Types.ObjectId, ref: 'Tweet' },
    tag: { type: String },
});


module.exports = mongoose.model('Tweet', tweetSchema);
