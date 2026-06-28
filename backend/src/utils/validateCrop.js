const validateCrop = (data, isUpdate = false) => {
  const { cropName, season, soilType, expectedYield, marketPrice } = data;

  const checkString = (val) => val !== undefined && val !== null && typeof val === 'string' && val.trim().length > 0;
  const checkNumber = (val) => val !== undefined && val !== null && !isNaN(Number(val)) && Number(val) > 0;

  if (!isUpdate) {
    if (!checkString(cropName)) return "cropName is required and must be a non-empty string";
    if (!checkString(season)) return "season is required and must be a non-empty string";
    if (!checkString(soilType)) return "soilType is required and must be a non-empty string";
    if (!checkNumber(expectedYield)) return "expectedYield is required and must be a positive number";
    if (!checkNumber(marketPrice)) return "marketPrice is required and must be a positive number";
  } else {
    // Only validate fields that are provided in an update
    if (cropName !== undefined && !checkString(cropName)) return "cropName must be a non-empty string";
    if (season !== undefined && !checkString(season)) return "season must be a non-empty string";
    if (soilType !== undefined && !checkString(soilType)) return "soilType must be a non-empty string";
    if (expectedYield !== undefined && !checkNumber(expectedYield)) return "expectedYield must be a positive number";
    if (marketPrice !== undefined && !checkNumber(marketPrice)) return "marketPrice must be a positive number";
  }

  return null; // Indicates validation passed
};

module.exports = validateCrop;
