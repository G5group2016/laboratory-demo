const express = require('express');
const router = express.Router();
const { submitContact, getContacts, updateContact } = require('../controllers/contactController');
const { protect, authorize } = require('../middleware/auth');

router.post('/', submitContact);
router.get('/admin', protect, authorize('admin', 'receptionist'), getContacts);
router.put('/admin/:id', protect, authorize('admin', 'receptionist'), updateContact);

module.exports = router;
