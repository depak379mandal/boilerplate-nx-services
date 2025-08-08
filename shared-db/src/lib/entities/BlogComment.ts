import {
  Entity, PrimaryGeneratedColumn, Column,
  ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn
} from "typeorm";
import { Blog } from "./Blog";
import { User } from "./User";

@Entity("blog_comments")
export class BlogComment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Blog, (blog) => blog.blogComments)
  @JoinColumn({ name: "blog_id" })
  blog: Blog;

  @ManyToOne(() => User, (user) => user.blogComments)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column({ name: "comment", length: 1000, type: "varchar" })
  comment: string;

  @Column({ name: "website_url", nullable: true, type: "varchar" })
  websiteUrl: string;

  @Column({ name: "status", default: true, type: "boolean" })
  status: boolean;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}