// Pharmacy Controller
const pharmacyService = require('../services/pharmacyService');

exports.getNearbyPharmacies = async (req, res) => {
  try {
    const { lat, lng, radius } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({
        success: false,
        message: 'Latitude (lat) and Longitude (lng) query parameters are required.'
      });
    }

    const pharmacies = await pharmacyService.getNearbyPharmacies(lat, lng, radius);

    res.status(200).json({
      success: true,
      count: pharmacies.length,
      data: pharmacies
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error retrieving nearby pharmacies',
      error: error.message
    });
  }
};
