// define user schema
const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    user_id: { type: Number, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    pwd: { type: String, required: true },
    username: { type: String, required: true },
    description: { type: String },
    ban: { type: Boolean },
    favorite_visibility: { type: Boolean },
    global_visibility: { type: Number },
    avatar: {
        data: Buffer,
        contentType: String
    },
    tag: [{ type: String }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    fans: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    black_list: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    tweet: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tweet' }],
    favorite: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tweet' }],
    comment: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    chat: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chat' }]
});


module.exports = mongoose.model('User', userSchema);

