const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    bookingId: { type: String, unique: true },
    // Patient info
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    patientName: { type: String, required: true },
    patientEmail: { type: String, required: true },
    patientPhone: { type: String, required: true },
    patientAge: { type: Number },
    patientGender: { type: String, enum: ['male', 'female', 'other'] },
    // Booking details
    bookingType: { type: String, enum: ['test', 'package'], required: true },
    test: { type: mongoose.Schema.Types.ObjectId, ref: 'Test' },
    package: { type: mongoose.Schema.Types.ObjectId, ref: 'Package' },
    testName: { type: String }, // Denormalized for quick access
    // Schedule
    preferredDate: { type: Date, required: true },
    preferredTime: { type: String, required: true },
    // Home collection
    isHomeCollection: { type: Boolean, default: false },
    address: { type: String },
    // Status
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'sample_collected', 'processing', 'completed', 'cancelled'],
      default: 'pending',
    },
    // Payment
    totalAmount: { type: Number },
    paymentStatus: { type: String, enum: ['pending', 'paid', 'refunded'], default: 'pending' },
    // Notes
    notes: { type: String },
    // Admin notes
    adminNotes: { type: String },
  },
  { timestamps: true }
);

// Auto generate booking ID
bookingSchema.pre('save', function (next) {
  if (!this.bookingId) {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    this.bookingId = `LAB-${timestamp}-${random}`;
  }
  if (typeof next === 'function') next();
});

module.exports = mongoose.model('Booking', bookingSchema);
