const { extractTextFromImage } = require("../services/ocrService");
const { lookupByExtractedText } = require("../services/drugLookupService");

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/heic"];

const identifyMedicine = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ detail: "An image file is required" });
    }

    if (!ALLOWED_TYPES.includes(req.file.mimetype)) {
      return res.status(400).json({ detail: `Unsupported file type: ${req.file.mimetype}. Use JPEG or PNG.` });
    }

    if (req.file.size > MAX_FILE_SIZE) {
      return res.status(400).json({ detail: "File too large. Maximum size is 10 MB." });
    }

    const extractedText = await extractTextFromImage(req.file.buffer);
    
    // Clean up the text by removing non-alphanumeric characters for validation
    const cleanText = extractedText ? extractedText.replace(/[^a-zA-Z0-9\s]/g, '').trim() : '';
    
    if (!cleanText || cleanText.length < 3) {
      return res.status(422).json({
        detail: "Could not identify a clear drug name from the image. Please try a clearer photo or search by name instead.",
      });
    }

    const drug_name = extractedText.split('\n')[0].trim();

    const matches = await lookupByExtractedText(extractedText);
    const drug = matches.length > 0 ? matches[0] : null;

    if (!drug) {
      return res.status(404).json({
        detail: `Drug '${drug_name}' was read from the image but not found in the database.`,
      });
    }

    res.status(200).json({
      drug: drug,
      lang: req.query.lang || "en",
      ocr: {
        detected_name: drug ? drug.name.en || drug.genericName : drug_name,
        raw_text: extractedText
      }
    });
  } catch (error) {
    res.status(500).json({ detail: "OCR identification failed", error: error.message });
  }
};

module.exports = { identifyMedicine };