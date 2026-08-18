const express = require('express');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const medicineRoutes = require('./routes/medicineRoutes');
const userRoutes = require('./routes/userRoutes');
const protect = require('./middleware/authMiddleware');
const chatbotRoutes = require('./routes/chatbotRoutes');


const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, '../../frontend')));

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/medicines', medicineRoutes);
app.use('/api/users', userRoutes);
app.use('/api/chatbot', chatbotRoutes);
const ocrRoutes = require("./routes/ocrRoutes");
app.use("/api/ocr", ocrRoutes);

app.get('/api/protected-test', protect, (req, res) => {
    res.json({ message: 'You are authenticated', userId: req.userId });
});

module.exports = app;