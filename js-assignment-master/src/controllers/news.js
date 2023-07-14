const newsModel = require('../models/news');
const { isNewsDataInvalid } = require('../lib/helper');

const createNewsByTourId = async (newsInfo) => {
  const { title = '', description = '', tourId = 0 } = newsInfo || {};
  if (isNewsDataInvalid({ title, description, tourId })) {
    throw new Error('createNewsByTourId: News Request Data is Invalid');
  }
  const newsResult = await newsModel.createNews({ title, description });
  const { insertId: newsId } = newsResult || {};
  if (newsId <= 0) {
    return getApiResponseMessage({
      apiStatus: false,
      message:
        `Some issue occured while saving News.`,
    });
  }
  const matches = await newsModel.getMatchesByTourId({ tourId });
  if (!matches || matches.length == 0) {
    return getApiResponseMessage({
      apiStatus: false,
      message: "Some issue occured while adding tour-match mapping.",
    });
  }
  const params = [];
  matches.forEach((match) => {
    if (match && match.id > 0) {
      params.push([newsId, match.id]);
    }
  });
  const result = await newsModel.addNewsTourMapping(params);
  return getApiResponseMessage({
    apiStatus: result,
    message: 'News Created Successfully.',
  });
};

const createNewsByMatchId = async (newsInfo) => {
  const { title = '', description = '', matchId = 0 } = newsInfo || {};
  if (isNewsDataInvalid({ title, description, matchId })) {
    throw new Error('createNewsByMatchId: News Request Data is Invalid');
  }
  const newsResult = await newsModel.createNews({ title, description });
  const { insertId: newsId } = newsResult || {};
  if (newsId <= 0) {
    return getApiResponseMessage({
      apiStatus: false,
      message: 'Some issue occured while saving News.',
    });
  }
  const result = await newsModel.addNewsMatchMapping({ newsId, matchId });
  return getApiResponseMessage({
    apiStatus: result,
    message: 'News Created Successfully.',
  });
};

const getApiResponseMessage = ({ response, message }) => {
  return {
    message,
    response,
  };
};

const getNewsBySportId = async (params) => {
  const { sportId } = params;
  if (!sportId) {
    throw new Error('Missing required parameter: sportId');
  }
  return await newsModel.getNewsBySportId({ sportId });
};
const getNewsByTourId = async (params) => {
  const { tourId } = params;
  if (!tourId) {
    throw new Error('Missing required parameter: tourId');
  }
  return await newsModel.getNewsByTourId({ tourId });
};
const getNewsByMatchId = async (params) => {
  const { matchId } = params;
  if (!matchId) {
    throw new Error('Missing required parameter: matchId');
  }
  return await newsModel.getNewsByMatchId({ matchId });
};

module.exports = {
  createNewsByTourId,
  createNewsByMatchId,
  getNewsBySportId,
  getNewsByTourId,
  getNewsByMatchId,
};
