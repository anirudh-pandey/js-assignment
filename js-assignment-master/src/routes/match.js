const matchController = require('../controllers/match');

module.exports = function (app) {
  app.route('/matches').get(async (req, res, next) => {
    try {
      return res.json(await matchController.getAllMatches());
    } catch (err) {
      return next(err);
    }
  });

};
