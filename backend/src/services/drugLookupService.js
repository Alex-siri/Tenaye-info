const Medicine = require("../models/Medicine");
const lookupByExtractedText = async (extractedText) => {
  const words = extractedText
    .split(/\s+/)
    .filter((w) => w.length > 3)
    .slice(0, 5);
  if (words.length === 0) return [];
  const regexes = words.map((w) => new RegExp(w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"));
  const matches = await Medicine.find({
    $or: regexes.flatMap((r) => [{ "name.en": r }, { genericName: r }]),
  }).limit(3);
  return matches;
};
module.exports = { lookupByExtractedText };
