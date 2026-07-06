const express = require('express');
const router = express.Router();
const { getTests, getTest, getCategories, createTest, updateTest, deleteTest } = require('../controllers/testController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public routes
router.get('/categories', getCategories);
router.get('/', getTests);
router.get('/:slug', getTest);

// Admin routes
router.post('/admin', protect, authorize('admin', 'receptionist'), upload.single('image'), createTest);
router.put('/admin/:id', protect, authorize('admin', 'receptionist'), upload.single('image'), updateTest);
router.delete('/admin/:id', protect, authorize('admin'), deleteTest);

module.exports = router;
