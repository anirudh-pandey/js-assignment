const matchModel = require('../models/match');

const getAllMatches = async () => {
  return await matchModel.getAllMatches();
};

module.exports = {
  getAllMatches,
};
