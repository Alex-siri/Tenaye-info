const Medicine = require('../models/Medicine');
const { fetchDrugFromOpenFDA } = require('../services/openFdaService');

const searchMedicine = async (req, res) => {
    try {
        const { name } = req.query;

        if (!name) {
            return res.status(400).json({ message: 'A "name" query parameter is required' });
        }

        const regex = new RegExp(name, 'i');

        // 1. First, search our local MongoDB database
        let results = await Medicine.find({
            $or: [{ 'name.en': regex }, { 'name.am': regex }, { genericName: regex }],
        }).lean(); // lean() returns plain JS objects so we can modify them

        const { translateToAmharic } = require('../services/translationService');

        // If we found local results, ensure they are translated
        if (results.length > 0) {
            const hasAmharic = (str) => /[\u1200-\u137F]/.test(str || '');
            
            for (let i = 0; i < results.length; i++) {
                const drug = results[i];
                
                if (drug.name && drug.name.en && !hasAmharic(drug.name.am)) {
                    drug.name.am = await translateToAmharic(drug.name.en);
                }
                if (drug.purpose && drug.purpose.en && !hasAmharic(drug.purpose.am)) {
                    drug.purpose.am = await translateToAmharic(drug.purpose.en);
                }
                if (drug.dosage && drug.dosage.en && !hasAmharic(drug.dosage.am)) {
                    drug.dosage.am = await translateToAmharic(drug.dosage.en);
                }
                if (drug.warnings && drug.warnings.en && !hasAmharic(drug.warnings.am)) {
                    drug.warnings.am = await translateToAmharic(drug.warnings.en);
                }
            }
        }

        // 2. If no local results, fallback to OpenFDA API
        if (results.length === 0) {
            const fdaDrug = await fetchDrugFromOpenFDA(name);
            if (fdaDrug) {
                results = [fdaDrug];
            }
        }

        res.status(200).json({ count: results.length, medicines: results });
    } catch (error) {
        res.status(500).json({ message: 'Search failed', error: error.message });
    }
};

module.exports = { searchMedicine };