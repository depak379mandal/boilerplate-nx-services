import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();
import { Category } from './entities/Category';
import { Blog } from './entities/Blog';
import { BlogCategory } from './entities/BlogCategory';
import { BlogComment } from './entities/BlogComment'; // ✅ Include this
import { Faq } from './entities/Faq';
import { Page } from './entities/Page';
import { PageRevision } from './entities/PageRevision';
import { Media } from './entities/Media';
import { User } from './entities';
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
  ],
  migrations: [__dirname + '/migration/*.ts'],
});
