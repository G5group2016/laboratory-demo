const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, lowercase: true },
    excerpt: { type: String, required: true, maxlength: 300 },
    content: { type: String, required: true },
    category: {
      type: String,
      enum: ['Health Tips', 'Disease Prevention', 'Nutrition', 'Lab Technology', 'Patient Stories', 'News'],
      default: 'Health Tips',
    },
    tags: [{ type: String }],
    image: { type: String, default: '' },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    authorName: { type: String },
    readTime: { type: String, default: '5 min read' },
    views: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    publishedAt: { type: Date },
  },
  { timestamps: true }
);

blogSchema.pre('save', function (next) {
  if (!this.slug) {
    this.slug = this.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
  }
  if (this.isPublished && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  if (typeof next === 'function') next();
});

module.exports = mongoose.model('Blog', blogSchema);
