const mysql = require('../lib/mysql');

const createNews = async ({ title, description }) => {
  const statement = `insert into mydb.news (title, description) values (?, ?)`;
  const parameters = [title, description];
  return await mysql.query(statement, parameters, (err, result) => {
    console.log(result, '============');
  });
};

const getMatchesByTourId = async ({ tourId }) => {
  const statement = 'select name, id from mydb.matches where tourId = ?';
  const parameters = [tourId];
  return await mysql.query(statement, parameters);
};

const addNewsTourMapping = async (newsMatchMappingArray) => {
  const statement = 'insert into matchnews(newsId, matchId) values ?;';
  const parameters = [...newsMatchMappingArray];
  return await mysql.query(statement, [parameters]);
};

const addNewsMatchMapping = async ({ newsId, matchId }) => {
  const statement = 'insert into matchnews(newsId, matchId) values (?, ?);';
  const parameters = [newsId, matchId];
  return await mysql.query(statement, parameters);
};

const getNewsBySportId = async (params) => {
  const statement = `select
                        distinct news.id, news.title, news.description
                      from mydb.sports inner join mydb.tours
                        on sports.id = tours.sportId
                      inner join mydb.matches
                        on tours.id = matches.tourId
                      inner join mydb.matchnews
                        on matches.id = matchnews.matchId
                      inner join mydb.news
                        on matchnews.newsId = news.id
                      where sports.id = ?;`;
  const parameters = [params.sportId];
  return await mysql.query(statement, parameters);
};

const getNewsByTourId = async (params) => {
  const statement = `select
                        distinct news.id, news.title, news.description
                      from mydb.tours inner join mydb.matches
                        on tours.id = matches.tourId
                      inner join mydb.matchnews
                        on matches.id = matchnews.matchId
                      inner join mydb.news
                        on matchnews.newsId = news.id
                      where tours.id = ?`;
  const parameters = [params.tourId];
  return await mysql.query(statement, parameters);
};

const getNewsByMatchId = async (params) => {
  const statement = `select
                        distinct news.id, news.title, news.description
                      from mydb.matches inner join mydb.matchnews
                        on matches.id = matchnews.matchId
                      inner join mydb.news
                        on matchnews.newsId = news.id
                      where matches.id = ?`;
  const parameters = [params.matchId];
  return await mysql.query(statement, parameters);
};

module.exports = {
  createNews,
  getMatchesByTourId,
  addNewsMatchMapping,
  addNewsTourMapping,
  getNewsBySportId,
  getNewsByTourId,
  getNewsByMatchId,
};
