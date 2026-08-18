const express = require("express");
const multer = require("multer");
const { identifyMedicine } = require("../controllers/ocrController");
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 }, fileFilter: (req, file, cb) => cb(null, file.mimetype?.startsWith("image/")) });
const router = express.Router();
router.post("/identify", upload.single("image"), identifyMedicine);
module.exports = router;
