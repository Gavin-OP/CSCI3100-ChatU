// define blacklist schema
const mongoose = require('mongoose');


const blacklistSchema = mongoose.Schema({
    user_id: { type: Number },
    blacklist: [{ type: Number }],
});


module.exports = mongoose.model('Blacklist', blacklistSchema);