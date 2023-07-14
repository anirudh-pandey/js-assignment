const Tour = require('../models/tour');

const getAllTours = async () => {
  return await Tour.getAllTours();
};

const getMatchesByTourName = async (params) => {
  const { tourName } = params;
  if (!tourName) {
    throw new Error('Missing required parameter: tourName');
  }

  const matches = await Tour.getMatchesByTourName({ tourName });
  if(matches.length === 0) {
    throw new Error('Missing required parameter: tourName');
  }
  return matches;
};

module.exports = {
  getAllTours: getAllTours,
  getMatchesByTourName: getMatchesByTourName,
};
