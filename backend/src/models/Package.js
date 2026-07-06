const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, lowercase: true },
    category: {
      type: String,
      enum: [
        'Basic', 'Women\'s Wellness', 'Men\'s Wellness', 'Senior Citizen',
        'Diabetes', 'Heart', 'Executive', 'Corporate', 'Other'
      ],
      default: 'Basic'
    },
    description: { type: String },
    testsIncluded: [{ type: String }], // Array of test names/descriptions
    testsCount: { type: Number, default: 0 },
    price: { type: Number, required: true },
    discountedPrice: { type: Number },
    discountPercent: { type: Number, default: 0 },
    reportTime: { type: String, default: '24 hours' },
    sampleType: { type: String, default: 'Blood' },
    image: { type: String, default: '' },
    badge: { type: String, default: '' }, // e.g., "Best Seller", "Popular"
    isHomeCollection: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

packageSchema.pre('save', function (next) {
  if (!this.slug) {
    this.slug = this.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
  }
  if (typeof next === 'function') next();
});

module.exports = mongoose.model('Package', packageSchema);
