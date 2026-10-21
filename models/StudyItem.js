const mongoose = require('mongoose');

const StudyItemSchema = new mongoose.Schema({
    title: { type: String, required: true },
    subject: { type: String, required: true },
    notes: { type: String },
    completed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('StudyItem', StudyItemSchema);