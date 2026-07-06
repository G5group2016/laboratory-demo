const express = require('express');
const router = express.Router();
const {
  createBooking, getAllBookings, updateBooking, getMyBookings, getDashboardStats
} = require('../controllers/bookingController');
const { protect, authorize, optionalAuth } = require('../middleware/auth');

router.post('/', optionalAuth, createBooking);
router.get('/my', protect, getMyBookings);
router.get('/admin', protect, authorize('admin', 'receptionist'), getAllBookings);
router.put('/admin/:id', protect, authorize('admin', 'receptionist'), updateBooking);
router.get('/admin/stats', protect, authorize('admin'), getDashboardStats);

module.exports = router;
