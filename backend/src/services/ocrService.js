const Tesseract = require('tesseract.js');

const extractTextFromImage = async (imageBuffer) => {
    try {
        const { data: { text } } = await Tesseract.recognize(imageBuffer, 'eng');
        if (!text || text.trim().length === 0) {
            return "";
        }
        return text;
    } catch (error) {
        console.error("OCR extraction failed:", error);
        return "";
    }
};

module.exports = { extractTextFromImage };
