const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');
const Package = require('../models/Package');
const Testimonial = require('../models/Testimonial');
const Gallery = require('../models/Gallery');
const User = require('../models/User');
const { asyncHandler } = require('../middleware/error');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

// ================== PACKAGES ==================
router.get('/packages', asyncHandler(async (req, res) => {
  const { featured, page = 1, limit = 12 } = req.query;
  const query = { isActive: true };
  if (featured === 'true') query.isFeatured = true;
  const packages = await Package.find(query).sort('order').skip((page - 1) * limit).limit(parseInt(limit));
  const total = await Package.countDocuments(query);
  res.json({ success: true, total, data: packages });
}));

router.get('/packages/:id', asyncHandler(async (req, res) => {
  const pkg = await Package.findById(req.params.id);
  if (!pkg) return res.status(404).json({ success: false, message: 'Package not found' });
  res.json({ success: true, data: pkg });
}));

// Admin Package CRUD
router.post('/admin/packages', protect, authorize('admin'), upload.single('image'), asyncHandler(async (req, res) => {
  if (req.file) req.body.image = `/uploads/images/${req.file.filename}`;
  const pkg = await Package.create(req.body);
  res.status(201).json({ success: true, data: pkg });
}));
router.put('/admin/packages/:id', protect, authorize('admin'), upload.single('image'), asyncHandler(async (req, res) => {
  if (req.file) req.body.image = `/uploads/images/${req.file.filename}`;
  const pkg = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ success: true, data: pkg });
}));
router.delete('/admin/packages/:id', protect, authorize('admin'), asyncHandler(async (req, res) => {
  await Package.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: 'Package deleted' });
}));

// ================== DOCTORS ==================
router.get('/doctors', asyncHandler(async (req, res) => {
  const { featured } = req.query;
  const query = { isActive: true };
  if (featured === 'true') query.isFeatured = true;
  const doctors = await Doctor.find(query).sort('order');
  res.json({ success: true, count: doctors.length, data: doctors });
}));

router.post('/admin/doctors', protect, authorize('admin'), upload.single('photo'), asyncHandler(async (req, res) => {
  if (req.file) req.body.photo = `/uploads/images/${req.file.filename}`;
  const doctor = await Doctor.create(req.body);
  res.status(201).json({ success: true, data: doctor });
}));
router.put('/admin/doctors/:id', protect, authorize('admin'), upload.single('photo'), asyncHandler(async (req, res) => {
  if (req.file) req.body.photo = `/uploads/images/${req.file.filename}`;
  const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ success: true, data: doctor });
}));
router.delete('/admin/doctors/:id', protect, authorize('admin'), asyncHandler(async (req, res) => {
  await Doctor.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: 'Doctor deleted' });
}));

// ================== TESTIMONIALS ==================
router.get('/testimonials', asyncHandler(async (req, res) => {
  const testimonials = await Testimonial.find({ isActive: true }).sort('order');
  res.json({ success: true, data: testimonials });
}));

router.post('/admin/testimonials', protect, authorize('admin'), upload.single('patientPhoto'), asyncHandler(async (req, res) => {
  if (req.file) req.body.patientPhoto = `/uploads/images/${req.file.filename}`;
  const t = await Testimonial.create(req.body);
  res.status(201).json({ success: true, data: t });
}));
router.put('/admin/testimonials/:id', protect, authorize('admin'), asyncHandler(async (req, res) => {
  const t = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ success: true, data: t });
}));
router.delete('/admin/testimonials/:id', protect, authorize('admin'), asyncHandler(async (req, res) => {
  await Testimonial.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: 'Testimonial deleted' });
}));

// ================== GALLERY ==================
router.get('/gallery', asyncHandler(async (req, res) => {
  const { category } = req.query;
  const query = { isActive: true };
  if (category && category !== 'all') query.category = category;
  const gallery = await Gallery.find(query).sort('order');
  res.json({ success: true, data: gallery });
}));

router.post('/admin/gallery', protect, authorize('admin'), upload.single('image'), asyncHandler(async (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: 'Image required' });
  req.body.image = `/uploads/images/${req.file.filename}`;
  const item = await Gallery.create(req.body);
  res.status(201).json({ success: true, data: item });
}));
router.delete('/admin/gallery/:id', protect, authorize('admin'), asyncHandler(async (req, res) => {
  await Gallery.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: 'Gallery item deleted' });
}));

// ================== ADMIN USERS ==================
router.get('/admin/users', protect, authorize('admin'), asyncHandler(async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const total = await User.countDocuments();
  const users = await User.find().sort('-createdAt').skip((page - 1) * limit).limit(parseInt(limit));
  res.json({ success: true, total, data: users });
}));
router.put('/admin/users/:id', protect, authorize('admin'), asyncHandler(async (req, res) => {
  const { role, isActive } = req.body;
  const user = await User.findByIdAndUpdate(req.params.id, { role, isActive }, { new: true });
  res.json({ success: true, data: user });
}));
router.delete('/admin/users/:id', protect, authorize('admin'), asyncHandler(async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: 'User deleted' });
}));

module.exports = router;
