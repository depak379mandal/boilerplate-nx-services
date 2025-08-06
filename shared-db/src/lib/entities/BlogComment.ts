import {
  Entity, PrimaryGeneratedColumn, Column,
  ManyToOne, CreateDateColumn, UpdateDateColumn
} from "typeorm";
import { Blog } from "./Blog";
import { User } from "./user.entity";

@Entity("blog_comments")
export class BlogComment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Blog, (blog) => blog.blogComments)
  blog: Blog;

  @ManyToOne(() => User, (user) => user.blogComments)
  user: User;

  @Column({ length: 1000 })
  comment: string;

  @Column({ nullable: true })
  websiteUrl: string;

  @Column({ default: true })
  status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}