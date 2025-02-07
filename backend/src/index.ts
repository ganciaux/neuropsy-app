import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { AppDataSource } from './data-source';
import { logger } from './logger';
import { getPort } from './utils';
import { root } from './routes/root';
import { getAllUsers } from './routes/get-all-user';

dotenv.config();

const app = express();
const PORT = getPort(process.argv[2], process.env.PORT || '5000');

function setupExpress() {
  app.use(cors());
  app.use(bodyParser.json());

  app.get('/', root);
  app.get('/users', getAllUsers);
}

function startServer() {
  app.listen(PORT, () => {
    logger.info(
      `HTTP REST API Server is npw running at http://localhost:${PORT}/`
    );
  });
}

AppDataSource.initialize()
  .then((data) => {
    logger.info('The datasource has bee initialized successfully.');
    setupExpress();
    startServer();
  })
  .catch((err) => {
    logger.error("Can't initialized datasource.", err);
    process.exit(1);
  });
