const logger = require('./logger');
const dbMongo = require('./db.mongo');

dbMongo();
module.exports ={
    logger,
    dbMongo,
}