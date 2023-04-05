// define tag schema
const mongoose = require('mongoose');


const tagSchema = mongoose.Schema({
    user_id: { type: Number, ref: 'User' },
    tweet_id: { type: Number, ref: 'Tweet' },
    tag: [{ type: String }],
});


const Tag = mongoose.model('Tag', tagSchema);
