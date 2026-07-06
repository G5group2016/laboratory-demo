const express = require('express');
const router = express.Router();
const { getBlogs, getBlog, createBlog, updateBlog, deleteBlog, getAllBlogsAdmin } = require('../controllers/blogController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', getBlogs);
router.get('/admin', protect, authorize('admin'), getAllBlogsAdmin);
router.get('/:slug', getBlog);
router.post('/admin', protect, authorize('admin'), upload.single('image'), createBlog);
router.put('/admin/:id', protect, authorize('admin'), upload.single('image'), updateBlog);
router.delete('/admin/:id', protect, authorize('admin'), deleteBlog);

module.exports = router;
