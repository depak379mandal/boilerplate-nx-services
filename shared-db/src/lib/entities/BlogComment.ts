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

  @Column({ name: "comment", length: 1000 })
  comment: string;

  @Column({ name: "website_url", nullable: true })
  websiteUrl: string;

  @Column({ name: "status", default: true })
  status: boolean;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}