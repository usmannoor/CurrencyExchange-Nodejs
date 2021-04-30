const logger = require('../helper/logger');

/**
 * create options for db configuration
 * create a connection string based on the NODE_ENV
 * return the db instance
 */

async function connection () {
  try {
    const db = 'dbInstance';
    return db;
  } catch (err) {
    logger.log(3, 'Database', 'Connection', 'Connect with DB', 'Failed to connect to DB : => ', err);
  }
}

module.exports = {
  db: connection()
};
