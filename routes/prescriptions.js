const express = require('express');
const router = express.Router();
const { uploadPrescription, getAllPrescriptions, getMyPrescriptions, verifyPrescription } = require('../controllers/prescriptionController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.post('/upload', protect, authorize('customer'), upload.single('prescription'), uploadPrescription);
router.get('/', protect, authorize('admin', 'pharmacist'), getAllPrescriptions);
router.get('/my', protect, authorize('customer'), getMyPrescriptions);
router.put('/:id/verify', protect, authorize('pharmacist', 'admin'), verifyPrescription);

module.exports = router;
