const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String },
    subject: { type: String },
    message: { type: String, required: true, maxlength: 1000 },
    status: { type: String, enum: ['new', 'in_progress', 'resolved'], default: 'new' },
    adminNotes: { type: String },
    repliedAt: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Contact', contactSchema);
