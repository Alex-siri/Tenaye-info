require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Medicine = require('./models/Medicine');

const sampleMedicines = [
  {
    name: { en: 'Paracetamol', am: 'Parasitamol' },
    genericName: 'Acetaminophen',
    purpose: {
      en: 'Used to relieve mild to moderate pain and reduce fever.',
      am: 'Pain relief and fever reduction medicine.',
    },
    dosage: {
      en: 'Adults: 500mg-1000mg every 4-6 hours. Do not exceed 4000mg in 24 hours.',
      am: 'For adults: 500mg-1000mg every 4-6 hours.',
    },
    sideEffects: {
      en: 'Rare at normal doses. High doses can cause liver damage.',
      am: 'Rare at normal doses.',
    },
    warnings: {
      en: 'Do not combine with other paracetamol-containing products.',
      am: 'Do not combine with other paracetamol products.',
    },
    drugInteractions: {
      en: 'May interact with warfarin and alcohol.',
      am: 'May interact with warfarin and alcohol.',
    },
  },
];

const seedDatabase = async () => {
  await connectDB();
  await Medicine.deleteMany({});
  await Medicine.insertMany(sampleMedicines);
  console.log(`Seeded ${sampleMedicines.length} medicines.`);
  process.exit(0);
};

seedDatabase();