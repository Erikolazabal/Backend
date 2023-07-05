import mongoose from 'mongoose';
import envConfig from './envConfig.js';
import logger from '../utils/winston/winston.js';

const connectToDatabase = async () => {
  try {
    const URI = envConfig.mongoUri;
    await mongoose.connect(URI);
    logger.debug("Conectado exitosamente a la base de datos");
  } catch (error) {
    logger.fatal(error);
  }
};

// Envuelve la llamada a connectToDatabase en una función async
(async () => {
  await connectToDatabase();
})();
