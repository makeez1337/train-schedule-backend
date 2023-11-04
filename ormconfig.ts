import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  dropSchema: false,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  url: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
