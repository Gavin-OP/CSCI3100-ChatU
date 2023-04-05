// define fan schema
const mongoose = require('mongoose');


const fanSchema = mongoose.Schema({
    user_id: { type: Number },
    fan_id: [{ type: Number }],
});


module.exports = mongoose.model('Fan', fanSchema);