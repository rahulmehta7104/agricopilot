let crops = require('../data/crops');

// Helper to generate next auto-incrementing ID
const getNextId = () => {
  return crops.length > 0 ? Math.max(...crops.map(c => c.id)) + 1 : 1;
};

// GET /api/crops
exports.getAllCrops = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: crops
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// GET /api/crops/search?q=
exports.searchCrops = (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ success: false, message: "Search query 'q' is required" });
    }
    
    const query = q.toLowerCase();
    const filteredCrops = crops.filter(crop => 
      crop.cropName.toLowerCase().includes(query) || 
      crop.season.toLowerCase().includes(query)
    );
    
    res.status(200).json({
      success: true,
      data: filteredCrops
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// GET /api/crops/:id
exports.getCropById = (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const crop = crops.find(c => c.id === id);
    
    if (!crop) {
      return res.status(404).json({ success: false, message: "Crop Not Found" });
    }
    
    res.status(200).json({ success: true, data: crop });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// POST /api/crops
exports.createCrop = (req, res) => {
  try {
    const { cropName, season, soilType, expectedYield, marketPrice } = req.body;
    
    // Basic validation
    if (!cropName || !season || !soilType || expectedYield === undefined || marketPrice === undefined) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }
    
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
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// PUT /api/crops/:id
exports.updateCrop = (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const cropIndex = crops.findIndex(c => c.id === id);
    
    if (cropIndex === -1) {
      return res.status(404).json({ success: false, message: "Crop Not Found" });
    }
    
    const { cropName, season, soilType, expectedYield, marketPrice } = req.body;
    
    // Create updated object, retaining old values for missing fields
    const updatedCrop = {
      ...crops[cropIndex],
      cropName: cropName !== undefined ? cropName : crops[cropIndex].cropName,
      season: season !== undefined ? season : crops[cropIndex].season,
      soilType: soilType !== undefined ? soilType : crops[cropIndex].soilType,
      expectedYield: expectedYield !== undefined ? Number(expectedYield) : crops[cropIndex].expectedYield,
      marketPrice: marketPrice !== undefined ? Number(marketPrice) : crops[cropIndex].marketPrice
    };
    
    crops[cropIndex] = updatedCrop;
    res.status(200).json({ success: true, data: updatedCrop });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// DELETE /api/crops/:id
exports.deleteCrop = (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const cropIndex = crops.findIndex(c => c.id === id);
    
    if (cropIndex === -1) {
      return res.status(404).json({ success: false, message: "Crop Not Found" });
    }
    
    crops.splice(cropIndex, 1);
    // As per requirements: 204 implies "Delete Successful" and typically returns no content
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
