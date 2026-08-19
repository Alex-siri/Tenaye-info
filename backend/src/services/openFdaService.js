// OpenFDA API Service Integration
const { translateToAmharic } = require('./translationService');

async function fetchDrugFromOpenFDA(query) {
    try {
        // First try generic name
        let response = await fetch(`https://api.fda.gov/drug/label.json?search=openfda.generic_name:"${encodeURIComponent(query)}"&limit=1`);
        let data = response.ok ? await response.json() : null;
        
        // If no results, try brand name
        if (!data || !data.results || data.results.length === 0) {
            response = await fetch(`https://api.fda.gov/drug/label.json?search=openfda.brand_name:"${encodeURIComponent(query)}"&limit=1`);
            data = response.ok ? await response.json() : null;
        }

        if (!data || !data.results || data.results.length === 0) return null;
        
        const result = data.results[0];
        
        const openfda = result.openfda || {};
        const brandName = (openfda.brand_name && openfda.brand_name[0]) || '';
        const genericName = (openfda.generic_name && openfda.generic_name[0]) || '';
        
        const nameEn = brandName || genericName || query;
        const purposeEn = (result.purpose && result.purpose[0]) || (result.indications_and_usage && result.indications_and_usage[0]) || 'Information not provided';
        const dosageEn = (result.dosage_and_administration && result.dosage_and_administration[0]) || 'Information not provided';
        const warningsEn = (result.warnings && result.warnings[0]) || (result.boxed_warning && result.boxed_warning[0]) || 'Information not provided';

        // Translate to Amharic sequentially to avoid triggering Google Translate rate-limiting
        const nameAm = await translateToAmharic(nameEn);
        const purposeAm = await translateToAmharic(purposeEn);
        const dosageAm = await translateToAmharic(dosageEn);
        const warningsAm = await translateToAmharic(warningsEn);
        
        // Map the massive OpenFDA JSON structure into our clean Medicine Schema format
        return {
            name: { en: nameEn, am: nameAm },
            genericName: genericName,
            purpose: { en: purposeEn, am: purposeAm },
            dosage: { en: dosageEn, am: dosageAm },
            warnings: { en: warningsEn, am: warningsAm }
        };
    } catch (error) {
        console.error("OpenFDA fetch error:", error);
        return null;
    }
}

module.exports = { fetchDrugFromOpenFDA };
