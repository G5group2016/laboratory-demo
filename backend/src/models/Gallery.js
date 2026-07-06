const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    caption: { type: String },
    category: {
      type: String,
      enum: ['Laboratory', 'Equipment', 'Team', 'Facility', 'Events'],
      default: 'Laboratory',
    },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Gallery', gallerySchema);
