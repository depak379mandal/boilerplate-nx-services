import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();
import {
  Log,
  User,
  Blog,
  BlogCategory,
  BlogComment,
  Category,
  Faq,
  Page,
  PageRevision,
  Media,
} from './entities';

const DB_URL = process.env['DB_URL'];
if (!DB_URL) {
  throw new Error('Missing DB_URL in environment variables');
}

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: DB_URL,
  synchronize: false,
  logging: true,
  entities: [
    Blog,
    BlogCategory,
    BlogComment,
    Category,
    Faq,
    Page,
    PageRevision,
    Media,
    User,
    Log,
  ],
  migrations: [__dirname + '/migration/*.ts'],
});
