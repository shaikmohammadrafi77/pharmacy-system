const express = require('express');
const router = express.Router();
const { getAdminStats, getPharmacistStats } = require('../controllers/dashboardController');
const { protect, authorize } = require('../middleware/auth');

router.get('/admin-stats', protect, authorize('admin'), getAdminStats);
router.get('/pharmacist-stats', protect, authorize('pharmacist', 'admin'), getPharmacistStats);

module.exports = router;
