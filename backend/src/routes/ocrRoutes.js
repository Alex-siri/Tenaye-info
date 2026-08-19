const express = require("express");
const multer = require("multer");
const { identifyMedicine } = require("../controllers/ocrController");
// We use a larger multer limit (12MB) so our controller can cleanly catch the 10MB 
// limit and return the exact Python-style JSON error message.
const upload = multer({ 
  storage: multer.memoryStorage(), 
  limits: { fileSize: 12 * 1024 * 1024 } 
});
const router = express.Router();

// Changed from 'image' to 'file' to match the Python `file: UploadFile = File(...)` signature.
router.post("/identify", upload.single("file"), identifyMedicine);
module.exports = router;
