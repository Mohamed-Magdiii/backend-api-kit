const express = require('express');
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');

// eslint-disable-next-line import/no-extraneous-dependencies
const createError = require('http-errors');
const { apiErrorHandler } = require('./common/handler');
const keys = require('./common/data/keys');
const morgan = require('morgan');
const { logger } = require('./common/lib');

require('./common/lib')

app.use(morgan('dev'));
app.use(express.json())
app.use(bodyParser.json({ limit: '5mb', extended: true }));
app.use(express.urlencoded({ limit: '5mb', extended: true }));

app.use((req, res, next) => {
  next(createError(404));
});
app.use(apiErrorHandler);
app.use(cors());

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? `Pipe ${keys.port}`
    : `Port ${keys.port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      logger.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      logger.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`;
  logger.info(`Listening on ${bind}`);
};

server.listen(keys.port);
server.on('error', onError);
server.on('listening', onListening);