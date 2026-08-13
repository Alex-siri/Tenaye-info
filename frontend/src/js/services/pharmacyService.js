// Frontend Pharmacy API Service
const pharmacyService = {
  async getNearbyPharmacies(lat, lng, radius = 15) {
    try {
      const response = await fetch(`/api/pharmacies/nearby?lat=${lat}&lng=${lng}&radius=${radius}`);
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      const result = await response.json();
      return result.data || [];
    } catch (error) {
      console.error('Error fetching nearby pharmacies:', error);
      throw error;
    }
  }
};
