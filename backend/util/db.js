const mongoose = require("mongoose");
const logger = require("./logger");

function connect() {
  const conn = mongoose.connect(CONFIG.mongoDbUrl, CONFIG.mongoConfig);

  conn
    .then(db => {
      logger.info(`message:: MongoDB connection open on ${CONFIG.mongoDbUrl}`);
      return db;
    })
    .catch(err => {
      logger.error(
        `message:: MongoDB connection on ${CONFIG.mongoDbUrl} failed with error: ${err}`
      );
    });
}

module.exports.connect = connect;
