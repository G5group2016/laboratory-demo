const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema(
  {
    patientName: { type: String, required: true },
    patientPhoto: { type: String, default: '' },
    location: { type: String },
    rating: { type: Number, min: 1, max: 5, required: true },
    review: { type: String, required: true, maxlength: 500 },
    testTaken: { type: String },
    isVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Testimonial', testimonialSchema);
