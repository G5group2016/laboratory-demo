const Booking = require('../models/Booking');
const Test = require('../models/Test');
const Package = require('../models/Package');
const transporter = require('../config/mailer');
const { asyncHandler } = require('../middleware/error');

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Public
exports.createBooking = asyncHandler(async (req, res) => {
  const {
    patientName, patientEmail, patientPhone, patientAge, patientGender,
    bookingType, testId, packageId, preferredDate, preferredTime,
    isHomeCollection, address, notes
  } = req.body;

  // Get test/package details
  let testName = '';
  let totalAmount = 0;

  if (bookingType === 'test' && testId) {
    const test = await Test.findById(testId);
    if (!test) return res.status(404).json({ success: false, message: 'Test not found' });
    testName = test.name;
    totalAmount = test.discountedPrice || test.price;
  } else if (bookingType === 'package' && packageId) {
    const pkg = await Package.findById(packageId);
    if (!pkg) return res.status(404).json({ success: false, message: 'Package not found' });
    testName = pkg.name;
    totalAmount = pkg.discountedPrice || pkg.price;
  }

  const booking = await Booking.create({
    patientName, patientEmail, patientPhone, patientAge, patientGender,
    bookingType,
    test: bookingType === 'test' ? testId : undefined,
    package: bookingType === 'package' ? packageId : undefined,
    testName,
    preferredDate, preferredTime,
    isHomeCollection, address, notes,
    totalAmount,
    patient: req.user ? req.user._id : undefined,
  });

  // Send confirmation email
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: patientEmail,
      subject: `Booking Confirmed — ${testName} | MedLab Diagnostics`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #0B6EFD; padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0;">Booking Confirmed! ✅</h1>
          </div>
          <div style="padding: 30px; background: #f8faff;">
            <p style="font-size: 16px;">Dear <strong>${patientName}</strong>,</p>
            <p>Your booking has been confirmed. Here are your details:</p>
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <tr><td style="padding: 10px; background: #e8f4ff;"><strong>Booking ID</strong></td><td style="padding: 10px;">${booking.bookingId}</td></tr>
              <tr><td style="padding: 10px;"><strong>Test/Package</strong></td><td style="padding: 10px;">${testName}</td></tr>
              <tr><td style="padding: 10px; background: #e8f4ff;"><strong>Date</strong></td><td style="padding: 10px;">${new Date(preferredDate).toLocaleDateString('en-IN', { dateStyle: 'long' })}</td></tr>
              <tr><td style="padding: 10px;"><strong>Time</strong></td><td style="padding: 10px;">${preferredTime}</td></tr>
              <tr><td style="padding: 10px; background: #e8f4ff;"><strong>Collection Type</strong></td><td style="padding: 10px;">${isHomeCollection ? '🏠 Home Collection' : '🏥 Lab Visit'}</td></tr>
              <tr><td style="padding: 10px;"><strong>Amount</strong></td><td style="padding: 10px;">₹${totalAmount}</td></tr>
            </table>
            <p>Our team will contact you shortly to confirm the appointment.</p>
            <p style="color: #64748b; font-size: 14px;">For queries, call: <strong>1800-XXX-XXXX</strong></p>
          </div>
          <div style="background: #0B6EFD; padding: 15px; text-align: center;">
            <p style="color: white; margin: 0; font-size: 12px;">© 2024 MedLab Diagnostics. All rights reserved.</p>
          </div>
        </div>
      `,
    });
  } catch (emailError) {
    console.error('Email send error:', emailError.message);
    // Don't fail the booking if email fails
  }

  res.status(201).json({
    success: true,
    message: 'Booking created successfully! Confirmation email sent.',
    data: booking,
  });
});

// @desc    Get all bookings (Admin)
// @route   GET /api/admin/bookings
// @access  Private/Admin
exports.getAllBookings = asyncHandler(async (req, res) => {
  const { status, page = 1, limit = 20, search, date } = req.query;
  const query = {};
  if (status) query.status = status;
  if (date) {
    const start = new Date(date);
    const end = new Date(date);
    end.setDate(end.getDate() + 1);
    query.preferredDate = { $gte: start, $lt: end };
  }
  if (search) {
    query.$or = [
      { patientName: { $regex: search, $options: 'i' } },
      { patientEmail: { $regex: search, $options: 'i' } },
      { bookingId: { $regex: search, $options: 'i' } },
    ];
  }

  const total = await Booking.countDocuments(query);
  const bookings = await Booking.find(query)
    .populate('test', 'name price')
    .populate('package', 'name price')
    .sort('-createdAt')
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  res.status(200).json({
    success: true,
    count: bookings.length,
    total,
    pages: Math.ceil(total / limit),
    data: bookings,
  });
});

// @desc    Update booking status (Admin)
// @route   PUT /api/admin/bookings/:id
// @access  Private/Admin
exports.updateBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
  res.status(200).json({ success: true, data: booking });
});

// @desc    Get my bookings (Patient)
// @route   GET /api/bookings/my
// @access  Private
exports.getMyBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ patient: req.user.id })
    .populate('test', 'name price')
    .populate('package', 'name price')
    .sort('-createdAt');
  res.status(200).json({ success: true, count: bookings.length, data: bookings });
});

// @desc    Get dashboard stats (Admin)
// @route   GET /api/admin/stats
// @access  Private/Admin
exports.getDashboardStats = asyncHandler(async (req, res) => {
  const [
    totalBookings,
    pendingBookings,
    completedBookings,
    totalRevenue,
    bookingsByStatus,
    recentBookings,
    bookingsTrend,
  ] = await Promise.all([
    Booking.countDocuments(),
    Booking.countDocuments({ status: 'pending' }),
    Booking.countDocuments({ status: 'completed' }),
    Booking.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } },
    ]),
    Booking.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]),
    Booking.find().sort('-createdAt').limit(10).populate('test', 'name').populate('package', 'name'),
    Booking.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 },
          revenue: { $sum: '$totalAmount' },
        },
      },
      { $sort: { _id: -1 } },
      { $limit: 30 },
    ]),
  ]);

  res.status(200).json({
    success: true,
    data: {
      totalBookings,
      pendingBookings,
      completedBookings,
      totalRevenue: totalRevenue[0]?.total || 0,
      bookingsByStatus,
      recentBookings,
      bookingsTrend: bookingsTrend.reverse(),
    },
  });
});
