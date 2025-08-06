import {
  Entity, PrimaryGeneratedColumn, Column,
  ManyToOne, Index
} from "typeorm";
import { Blog } from "./Blog";
import { Category } from "./Category";

@Entity("blog_categories")
@Index(["blog", "category"], { unique: true })
export class BlogCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Blog, (blog) => blog.blogCategories)
  blog: Blog;

  @ManyToOne(() => Category, (category) => category.blogCategories)
  category: Category;
}