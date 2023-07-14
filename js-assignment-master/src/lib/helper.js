const fs = require('fs');
const path = require('path');

const fileList = function (dir) {
  return fs.readdirSync(dir).reduce((list, file) => {
    const name = path.join(dir, file);
    const isDir = fs.statSync(name).isDirectory();
    return list.concat(isDir ? fileList(name) : [name]);
  }, []);
};

const isNewsDataInvalid = ({ title, description, tourId, matchId }) => {
  if (!title || !description) {
    return true;
  }
  if (tourId <= 0 && matchId <= 0) {
    return true;
  }
  return false;
};

module.exports = {
  fileList,
  isNewsDataInvalid,
};
