const express = require('express');
const cors = require('cors');
const indexRoutes = require('./routes/index');
const cropRoutes = require('./routes/cropRoutes');

const app = express();

// Middleware configuration
// 1. cors() enables Cross-Origin Resource Sharing so the React frontend can talk to this API.
app.use(cors());
// 2. express.json() parses incoming requests with JSON payloads (replaces body-parser).
app.use(express.json());

// API Routes
app.use('/', indexRoutes);
app.use('/api/crops', cropRoutes);

module.exports = app;
