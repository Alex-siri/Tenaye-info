// Express Application Setup
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files per README specification
const frontendPath = path.join(__dirname, '../../frontend');
app.use(express.static(frontendPath));
app.use('/pages', express.static(path.join(frontendPath, 'pages')));
app.use('/public', express.static(path.join(frontendPath, 'public')));
app.use('/src', express.static(path.join(frontendPath, 'src')));

// Import Routes
const pharmacyRoutes = require('./routes/pharmacyRoutes');

// Mount API Routes
app.use('/api/pharmacies', pharmacyRoutes);

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

module.exports = app;
