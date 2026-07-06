const Test = require('../models/Test');
const { asyncHandler } = require('../middleware/error');

// @desc    Get all tests with filtering, pagination, search
// @route   GET /api/tests
// @access  Public
exports.getTests = asyncHandler(async (req, res) => {
  const { category, search, featured, page = 1, limit = 12, sort = '-createdAt' } = req.query;

  const query = { isActive: true };
  if (category && category !== 'all') query.category = category;
  if (featured === 'true') query.isFeatured = true;
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }

  const total = await Test.countDocuments(query);
  const tests = await Test.find(query)
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  res.status(200).json({
    success: true,
    count: tests.length,
    total,
    pages: Math.ceil(total / limit),
    currentPage: parseInt(page),
    data: tests,
  });
});

// @desc    Get single test by slug
// @route   GET /api/tests/:slug
// @access  Public
exports.getTest = asyncHandler(async (req, res) => {
  const test = await Test.findOne({ slug: req.params.slug, isActive: true });
  if (!test) return res.status(404).json({ success: false, message: 'Test not found' });
  res.status(200).json({ success: true, data: test });
});

// @desc    Create test (Admin)
// @route   POST /api/admin/tests
// @access  Private/Admin
exports.createTest = asyncHandler(async (req, res) => {
  if (req.file) req.body.image = `/uploads/images/${req.file.filename}`;
  const test = await Test.create(req.body);
  res.status(201).json({ success: true, data: test });
});

// @desc    Update test (Admin)
// @route   PUT /api/admin/tests/:id
// @access  Private/Admin
exports.updateTest = asyncHandler(async (req, res) => {
  if (req.file) req.body.image = `/uploads/images/${req.file.filename}`;
  const test = await Test.findByIdAndUpdate(req.params.id, req.body, {
    new: true, runValidators: true,
  });
  if (!test) return res.status(404).json({ success: false, message: 'Test not found' });
  res.status(200).json({ success: true, data: test });
});

// @desc    Delete test (Admin)
// @route   DELETE /api/admin/tests/:id
// @access  Private/Admin
exports.deleteTest = asyncHandler(async (req, res) => {
  const test = await Test.findByIdAndDelete(req.params.id);
  if (!test) return res.status(404).json({ success: false, message: 'Test not found' });
  res.status(200).json({ success: true, message: 'Test deleted' });
});

// @desc    Get test categories with counts
// @route   GET /api/tests/categories
// @access  Public
exports.getCategories = asyncHandler(async (req, res) => {
  const categories = await Test.aggregate([
    { $match: { isActive: true } },
    { $group: { _id: '$category', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);
  res.status(200).json({ success: true, data: categories });
});
