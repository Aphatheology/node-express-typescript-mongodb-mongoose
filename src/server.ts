require('dotenv').config();
import mongoose from 'mongoose';
import app from './app';
import config from './config/config';
import logger from './config/logger';

const startServer = async () => {
  try {
    await mongoose.connect(config.mongoose.url);
    const server = app.listen(config.port, () => {
      logger.info(`Db connected and app listening on port ${config.port}`);
    });

    const shutdown = async () => {
      logger.info('Shutting down...');
      await mongoose.disconnect();
      server.close(() => {
        logger.info('Server closed');
        process.exit(0);
      });
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};

startServer();
