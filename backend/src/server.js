// Server Entry Point
require('dotenv').config();

// Polyfill global fetch for Node 12 environments
if (!globalThis.fetch) {
    const nodeFetch = require('node-fetch');
    global.fetch = nodeFetch;
    global.Headers = nodeFetch.Headers;
    global.Request = nodeFetch.Request;
    global.Response = nodeFetch.Response;
}

const app = require('./app');

// MongoDB Connection (From Person B)
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

// Initialize DB and Start Server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Tenaye Info Backend Server running on port ${PORT}`);
    console.log(`Frontend served at http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error("❌ Failed to connect to MongoDB:", err);
  // Exiting on DB failure to prevent uninitialized server state
  process.exit(1);
});
