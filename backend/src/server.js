// Server Entry Point
const app = require('./app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Tenaye Info Backend Server running on port ${PORT}`);
  console.log(`🌍 Frontend served at http://localhost:${PORT}`);
});
