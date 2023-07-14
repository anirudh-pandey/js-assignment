const mysql = require('../lib/mysql');

const getAllTours = async () => {
  const statement = 'select * from tours;';
  const parameters = [];
  return await mysql.query(statement, parameters);
};

const getMatchesByTourName = async (params) => {
  const statement = `select
                            matches.id, matches.name, matches.format, matches.startTime, matches.endTime  
                        from
                            mydb.matches inner join mydb.tours
                            on matches.tourId = tours.id
                        where
                            tours.name = ?;`;
  const parameters = [params.tourName];
  return await mysql.query(statement, parameters);
};

module.exports = {
  getAllTours,
  getMatchesByTourName,
};
