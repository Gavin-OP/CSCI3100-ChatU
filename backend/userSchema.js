// define user schema
const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    user_id: { type: Number, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    pwd: { type: String, required: true },
    username: { type: String, required: true },
    description: { type: String, default: '' },
    ban: { type: Boolean, default: false },
    favorite_visibility: { type: Boolean, default: true },
    global_visibility: { type: Number, default: 2 },     // 0:private, 1:follow, 2:public
    is_admin: { type: Boolean, default: false },
    avatar: {
        data: Buffer,
        contentType: String,
    },
    tweet: [{ type: Number }],
    favorite: [{ type: Number }],
    comment: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    chat: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chat' }]
});


module.exports = mongoose.model('User', userSchema);

