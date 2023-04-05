// define follow schema
const mongoose = require('mongoose');


const fanSchema = mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    fan_id: [{ type: Number }],
});


module.exports = mongoose.model('Fan', fanSchema);