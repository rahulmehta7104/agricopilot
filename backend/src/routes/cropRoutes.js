const express = require('express');
const router = express.Router();
const cropController = require('../controllers/cropController');

// Define specific routes first to avoid conflicts with :id parameter
router.get('/search', cropController.searchCrops);

// Define CRUD routes
router.get('/', cropController.getAllCrops);
router.post('/', cropController.createCrop);
router.get('/:id', cropController.getCropById);
router.put('/:id', cropController.updateCrop);
router.delete('/:id', cropController.deleteCrop);

module.exports = router;
