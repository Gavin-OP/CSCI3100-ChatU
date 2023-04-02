// define feedback schema
const mongoose = require('mongoose');

const feedbackSchema = mongoose.Schema({
    feedback_id: { type: Number, unique: true, require: true },
    content: { type: String },
});

module.exports = mongoose.model('Feedback', feedbackSchema);
