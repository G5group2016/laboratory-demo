const mongoose = require('mongoose');

const testSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, lowercase: true },
    category: {
      type: String,
      required: true,
      enum: [
        'Blood Test', 'Urine Test', 'Thyroid Test', 'Diabetes Test',
        'Liver Function', 'Kidney Function', 'Heart Profile', 'Hormone Test',
        'Vitamin Test', 'Allergy Test', 'COVID Test', 'Cancer Screening',
        'Other'
      ],
    },
    description: { type: String },
    shortDescription: { type: String },
    price: { type: Number, required: true, min: 0 },
    discountedPrice: { type: Number },
    duration: { type: String, default: '24 hours' }, // Report time
    sampleType: { type: String, default: 'Blood' },
    preparation: { type: String }, // Fasting instructions etc.
    parameters: [{ type: String }], // What is tested
    image: { type: String, default: '' },
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    isHomeCollection: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Auto-generate slug
testSchema.pre('save', function (next) {
  if (!this.slug) {
    this.slug = this.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
  }
  if (typeof next === 'function') next();
});

module.exports = mongoose.model('Test', testSchema);
