// Pharmacy Routes
const express = require('express');
const router = express.Router();
const pharmacyController = require('../controllers/pharmacyController');

// GET /api/pharmacies/nearby?lat=...&lng=...
router.get('/nearby', pharmacyController.getNearbyPharmacies);

module.exports = router;
