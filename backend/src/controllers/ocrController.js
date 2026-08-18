const { extractTextFromImage } = require("../services/ocrService");
const { lookupByExtractedText } = require("../services/drugLookupService");
const identifyMedicine = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "An image file is required" });
    }
    const extractedText = await extractTextFromImage(req.file.buffer);
    if (!extractedText) {
      return res.status(200).json({
        matches: [],
        extractedText: "",
        message: "No text detected in image",
      });
    }
    const matches = await lookupByExtractedText(extractedText);
    res.status(200).json({ matches, extractedText });
  } catch (error) {
    res
      .status(500)
      .json({ message: "OCR identification failed", error: error.message });
  }
};
module.exports = { identifyMedicine };