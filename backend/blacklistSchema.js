// define blacklist schema
const mongoose = require('mongoose');


const blacklistSchema = mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    blacklist_is: [{ type: Number }],
});


module.exports = mongoose.model('Blacklist', blacklistSchema);