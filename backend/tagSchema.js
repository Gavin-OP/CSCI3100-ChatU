// define tag schema
const mongoose = require('mongoose');


const tagSchema = mongoose.Schema({
    user_id: { type: Number },
    tweet_id: { type: Number },
    tag: [{ type: String }],
});


const Tag = mongoose.model('Tag', tagSchema);
