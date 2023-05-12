const mongoose = require('mongoose');
const keys = require('../data');
const logger = require('./logger');
const connectDB = () => mongoose.connect(keys.mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then((db)=>{
    logger.info("Connected to MongoDB")
    return db;
}).catch((err)=>{
    logger.err("Could not connect to MongoDB, exiting the application")
    process.exit();
    return null;
})

module.exports = connectDB;
