const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema(
  {
    name: {
      en: { type: String, required: true, trim: true },
      am: { type: String, trim: true },
    },
    genericName: {
      type: String,
      trim: true,
    },
    purpose: {
      en: { type: String },
      am: { type: String },
    },
    dosage: {
      en: { type: String },
      am: { type: String },
    },
    sideEffects: {
      en: { type: String },
      am: { type: String },
    },
    warnings: {
      en: { type: String },
      am: { type: String },
    },
    drugInteractions: {
      en: { type: String },
      am: { type: String },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Medicine', medicineSchema);
