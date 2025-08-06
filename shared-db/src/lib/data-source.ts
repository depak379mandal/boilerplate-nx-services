import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: 'postgres://admin:admin@localhost:5432/storageking',
  entities: [__dirname + '/entities/*.ts'], // or [Faq, Page, etc.]
  migrations: [__dirname + '/migration/*.ts'],
  synchronize: true,
  logging: true,
});
