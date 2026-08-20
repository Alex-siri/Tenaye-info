const Medicine = require("../models/Medicine");
const { fetchDrugFromOpenFDA } = require("./openFdaService");

const lookupByExtractedText = async (extractedText) => {
  const words = extractedText
    .split(/\s+/)
    .filter((w) => w.length > 3)
    .slice(0, 5);
  if (words.length === 0) return [];
  const regexes = words.map((w) => new RegExp(w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"));
  
  // 1. Check local MongoDB
  let matches = await Medicine.find({
    $or: regexes.flatMap((r) => [{ "name.en": r }, { genericName: r }]),
  }).limit(3);
  
  // 2. If no local results, fallback to OpenFDA API using the best words
  if (matches.length === 0 && words.length > 0) {
    // Try up to the first 3 valid words extracted to find a match in OpenFDA
    for (let i = 0; i < Math.min(words.length, 3); i++) {
      const fdaDrug = await fetchDrugFromOpenFDA(words[i]);
      if (fdaDrug) {
        matches = [fdaDrug];
        break; // Stop searching once we find a match
      }
    }
  }
  
  return matches;
};
module.exports = { lookupByExtractedText };
