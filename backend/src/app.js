// Express Application Setup
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

// Person B's required routes
const authRoutes = require('./routes/authRoutes');
const medicineRoutes = require('./routes/medicineRoutes');
const userRoutes = require('./routes/userRoutes');
const chatbotRoutes = require('./routes/chatbotRoutes');
const protect = require('./middleware/authMiddleware');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files per README specification (Person D)
const frontendPath = path.join(__dirname, '../../frontend');
app.use(express.static(frontendPath));
app.use('/pages', express.static(path.join(frontendPath, 'pages')));
app.use('/public', express.static(path.join(frontendPath, 'public')));
app.use('/src', express.static(path.join(frontendPath, 'src')));

// Import Person D Routes
const pharmacyRoutes = require('./routes/pharmacyRoutes');

// Health Check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Protected Test Route (Person B)
app.get('/api/protected-test', protect, (req, res) => {
    res.json({ message: 'You are authenticated', userId: req.userId });
});

// Mount API Routes (Combined)
app.use('/api/pharmacies', pharmacyRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/medicines', medicineRoutes);
app.use('/api/users', userRoutes);
app.use('/api/chatbot', chatbotRoutes);
const ocrRoutes = require("./routes/ocrRoutes");
app.use("/api/ocr", ocrRoutes);

// Root route serves frontend/pages/index.html per README
app.get('/', (req, res) => {
  res.sendFile(path.join(frontendPath, 'pages/index.html'));
});

// Clean URL route fallback for HTML pages (e.g. /pharmacy-locator.html)
app.get('/:page.html', (req, res, next) => {
  const pageFile = path.join(frontendPath, 'pages', `${req.params.page}.html`);
  res.sendFile(pageFile, (err) => {
    if (err) next();
  });
});

// Fallback 404 handler for API routes
app.use('/api', (req, res) => {
  res.status(404).json({ success: false, message: 'API route not found' });
});

// Fallback 404 handler for frontend pages
app.use((req, res) => {
  res.status(404).sendFile(path.join(frontendPath, 'pages/404.html'));
});

module.exports = app;
