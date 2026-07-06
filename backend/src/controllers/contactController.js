const Contact = require('../models/Contact');
const transporter = require('../config/mailer');
const { asyncHandler } = require('../middleware/error');

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
exports.submitContact = asyncHandler(async (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  const contact = await Contact.create({ name, email, phone, subject, message });

  // Send notification to admin
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_USER,
      subject: `New Contact Enquiry: ${subject || 'General'}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Phone:</strong> ${phone || 'N/A'}</p><p><strong>Message:</strong> ${message}</p>`,
    });
  } catch (e) { console.error('Admin notification email failed:', e.message); }

  // Auto-reply to user
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Thank you for contacting MedLab Diagnostics',
      html: `<p>Dear ${name},</p><p>Thank you for reaching out. We have received your message and will get back to you within 24 hours.</p><p>For urgent queries, call: <strong>1800-XXX-XXXX</strong></p><p>MedLab Diagnostics Team</p>`,
    });
  } catch (e) { console.error('Auto-reply email failed:', e.message); }

  res.status(201).json({ success: true, message: 'Message sent successfully! We\'ll respond within 24 hours.', data: contact });
});

// @desc    Get all contact enquiries (Admin)
// @route   GET /api/admin/contacts
// @access  Private/Admin
exports.getContacts = asyncHandler(async (req, res) => {
  const { status, page = 1, limit = 20 } = req.query;
  const query = status ? { status } : {};
  const total = await Contact.countDocuments(query);
  const contacts = await Contact.find(query).sort('-createdAt').skip((page - 1) * limit).limit(parseInt(limit));
  res.status(200).json({ success: true, total, data: contacts });
});

// @desc    Update contact status (Admin)
// @route   PUT /api/admin/contacts/:id
// @access  Private/Admin
exports.updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!contact) return res.status(404).json({ success: false, message: 'Enquiry not found' });
  res.status(200).json({ success: true, data: contact });
});
