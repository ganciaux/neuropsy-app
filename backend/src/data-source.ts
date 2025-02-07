import { DataSource, DataSourceOptions } from 'typeorm';
import dotenv from 'dotenv';
import { logger } from './logger';
import { User } from './models/users';

dotenv.config();

const options:DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgrespw',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME,
  entities: [User],
  synchronize: true,
  logging: true,
}

export const AppDataSource = new DataSource(options);
