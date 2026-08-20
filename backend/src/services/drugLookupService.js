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
  
  // 2. If no local results, fallback to OpenFDA API using the best word
  if (matches.length === 0 && words.length > 0) {
    const fdaDrug = await fetchDrugFromOpenFDA(words[0]);
    if (fdaDrug) {
      matches = [fdaDrug];
    }
  }
  
  return matches;
};
module.exports = { lookupByExtractedText };
