let crops = require('../data/crops');
const validateCrop = require('../utils/validateCrop');

// Helpers
const getNextId = () => crops.length > 0 ? Math.max(...crops.map(c => c.id)) + 1 : 1;

const findCropIndex = (id) => crops.findIndex(c => c.id === parseInt(id, 10));

const throwError = (message, status) => {
  const err = new Error(message);
  err.status = status;
  throw err;
};

// GET /api/crops
exports.getAllCrops = (req, res, next) => {
  try {
    res.status(200).json({ success: true, data: crops });
  } catch (error) {
    next(error);
  }
};

// GET /api/crops/search?q=
exports.searchCrops = (req, res, next) => {
  try {
    const { q } = req.query;
    if (!q) throwError("Search query 'q' is required", 400);
    
    const query = q.toLowerCase();
    const filteredCrops = crops.filter(crop => 
      crop.cropName.toLowerCase().includes(query) || 
      crop.season.toLowerCase().includes(query)
    );
    
    res.status(200).json({ success: true, data: filteredCrops });
  } catch (error) {
    next(error);
  }
};

// GET /api/crops/:id
exports.getCropById = (req, res, next) => {
  try {
    const index = findCropIndex(req.params.id);
    if (index === -1) throwError("Crop Not Found", 404);
    
    res.status(200).json({ success: true, data: crops[index] });
  } catch (error) {
    next(error);
  }
};

// POST /api/crops
exports.createCrop = (req, res, next) => {
  try {
    const validationError = validateCrop(req.body);
    if (validationError) throwError(validationError, 400);
    
    const { cropName, season, soilType, expectedYield, marketPrice } = req.body;
    
    const newCrop = {
      id: getNextId(),
      cropName,
      season,
      soilType,
      expectedYield: Number(expectedYield),
      marketPrice: Number(marketPrice)
    };
    
    crops.push(newCrop);
    res.status(201).json({ success: true, data: newCrop });
  } catch (error) {
    next(error);
  }
};

// PUT /api/crops/:id
exports.updateCrop = (req, res, next) => {
  try {
    const index = findCropIndex(req.params.id);
    if (index === -1) throwError("Crop Not Found", 404);
    
    const validationError = validateCrop(req.body, true);
    if (validationError) throwError(validationError, 400);
    
    const { cropName, season, soilType, expectedYield, marketPrice } = req.body;
    const existingCrop = crops[index];
    
    const updatedCrop = {
      ...existingCrop,
      cropName: cropName !== undefined ? cropName : existingCrop.cropName,
      season: season !== undefined ? season : existingCrop.season,
      soilType: soilType !== undefined ? soilType : existingCrop.soilType,
      expectedYield: expectedYield !== undefined ? Number(expectedYield) : existingCrop.expectedYield,
      marketPrice: marketPrice !== undefined ? Number(marketPrice) : existingCrop.marketPrice
    };
    
    crops[index] = updatedCrop;
    res.status(200).json({ success: true, data: updatedCrop });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/crops/:id
exports.deleteCrop = (req, res, next) => {
  try {
    const index = findCropIndex(req.params.id);
    if (index === -1) throwError("Crop Not Found", 404);
    
    crops.splice(index, 1);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
