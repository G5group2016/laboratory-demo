const Blog = require('../models/Blog');
const { asyncHandler } = require('../middleware/error');

// @desc    Get all published blogs
// @route   GET /api/blogs
// @access  Public
exports.getBlogs = asyncHandler(async (req, res) => {
  const { category, search, featured, page = 1, limit = 9 } = req.query;
  const query = { isPublished: true };
  if (category && category !== 'all') query.category = category;
  if (featured === 'true') query.isFeatured = true;
  if (search) query.$or = [
    { title: { $regex: search, $options: 'i' } },
    { excerpt: { $regex: search, $options: 'i' } },
  ];

  const total = await Blog.countDocuments(query);
  const blogs = await Blog.find(query)
    .select('-content')
    .sort('-publishedAt')
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  res.status(200).json({ success: true, count: blogs.length, total, pages: Math.ceil(total / limit), data: blogs });
});

// @desc    Get single blog by slug
// @route   GET /api/blogs/:slug
// @access  Public
exports.getBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findOneAndUpdate(
    { slug: req.params.slug, isPublished: true },
    { $inc: { views: 1 } },
    { new: true }
  );
  if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
  res.status(200).json({ success: true, data: blog });
});

// @desc    Create blog (Admin)
// @route   POST /api/admin/blogs
// @access  Private/Admin
exports.createBlog = asyncHandler(async (req, res) => {
  if (req.file) req.body.image = `/uploads/images/${req.file.filename}`;
  req.body.authorName = req.user.name;
  req.body.author = req.user._id;
  const blog = await Blog.create(req.body);
  res.status(201).json({ success: true, data: blog });
});

// @desc    Update blog (Admin)
// @route   PUT /api/admin/blogs/:id
// @access  Private/Admin
exports.updateBlog = asyncHandler(async (req, res) => {
  if (req.file) req.body.image = `/uploads/images/${req.file.filename}`;
  const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
  res.status(200).json({ success: true, data: blog });
});

// @desc    Delete blog (Admin)
// @route   DELETE /api/admin/blogs/:id
// @access  Private/Admin
exports.deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findByIdAndDelete(req.params.id);
  if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
  res.status(200).json({ success: true, message: 'Blog deleted' });
});

// @desc    Get all blogs including drafts (Admin)
// @route   GET /api/admin/blogs
// @access  Private/Admin
exports.getAllBlogsAdmin = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const total = await Blog.countDocuments();
  const blogs = await Blog.find().select('-content').sort('-createdAt').skip((page - 1) * limit).limit(parseInt(limit));
  res.status(200).json({ success: true, total, data: blogs });
});
