const express = require("express");
const multer = require("multer");
const { identifyMedicine } = require("../controllers/ocrController");
const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();
router.post("/identify", upload.single("image"), identifyMedicine);
module.exports = router;
