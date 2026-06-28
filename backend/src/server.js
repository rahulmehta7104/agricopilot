// Load environment variables from .env file
require('dotenv').config();

// Import the configured Express app
const app = require('./app');

// Determine the port to run on
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`AgriCopilot Backend Server is running on http://localhost:${PORT}`);
});
