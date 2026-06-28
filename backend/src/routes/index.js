const express = require('express');
const router = express.Router();
const { getHealthStatus } = require('../controllers/healthController');

// Health check endpoint at GET /
router.get('/', getHealthStatus);

module.exports = router;
