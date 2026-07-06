const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    photo: { type: String, default: '' },
    email: { type: String, trim: true, lowercase: true },
    phone: { type: String },
    qualification: { type: String, required: true },
    specialization: { type: String, required: true },
    experience: { type: Number, default: 0 },
    bio: { type: String, maxlength: 1000 },
    languages: [{ type: String }],
    socialLinks: {
      linkedin: { type: String },
      twitter: { type: String },
    },
    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Doctor', doctorSchema);
