// define favorite schema
const mongoose = require('mongoose');


const favoriteSchema = mongoose.Schema({
    user_id: { type: Number },
    favorite_id: [{ type: Number }],
});


module.exports = mongoose.model('Favorite', favoriteSchema);