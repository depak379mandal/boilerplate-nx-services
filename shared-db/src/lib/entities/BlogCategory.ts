import {
  Entity, PrimaryGeneratedColumn, Column,
  ManyToOne, Index, JoinColumn
} from "typeorm";
import { Blog } from "./Blog";
import { Category } from "./Category";

@Entity("blog_categories")
@Index(["blog", "category"], { unique: true })
export class BlogCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Blog, (blog) => blog.blogCategories)
  @JoinColumn({ name: "blog_id" })
  blog: Blog;

  @ManyToOne(() => Category, (category) => category.blogCategories)
  @JoinColumn({ name: "category_id" })
  category: Category;
}