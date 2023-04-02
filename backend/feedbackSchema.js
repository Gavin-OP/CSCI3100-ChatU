// define feedback schema
const mongoose = require('mongoose');

const feedbackSchema = mongoose.Schema({
    feedbackId: { type: Number, unique: true },
    content: { type: String },
});

module.exports = mongoose.model('Feedback', feedbackSchema);
