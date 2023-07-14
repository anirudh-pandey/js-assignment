const newsController = require('../controllers/news');

module.exports = function (app) {
  app.route('/tour/news/').post(async (req, res, next) => {
    try {
      const { title, description, tourId } = req.body || {};
      return res.json(
        await newsController.createNewsByTourId({ title, description, tourId })
      );
    } catch (err) {
      return next(err);
    }
  });

  app.route('/match/news/').post(async (req, res, next) => {
    try {
      const { title, description, matchId } = req.body || {};
      return res.json(
        await newsController.createNewsByMatchId({
          title,
          description,
          matchId,
        })
      );
    } catch (err) {
      return next(err);
    }
  });

  app.route('/sport/:sportId/news/').get(async (req, res, next) => {
    try {
      let params = req.params;
      return res.json(await newsController.getNewsBySportId(params));
    } catch (err) {
      return next(err);
    }
  });

  app.route('/tour/:tourId/news').get(async (req, res, next) => {
    try {
      let params = req.params;
      return res.json(await newsController.getNewsByTourId(params));
    } catch (err) {
      return next(err);
    }
  });

  app.route('/match/:matchId/news').get(async (req, res, next) => {
    try {
      let params = req.params;
      return res.json(await newsController.getNewsByMatchId(params));
    } catch (err) {
      return next(err);
    }
  });
};
