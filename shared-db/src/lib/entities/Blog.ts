import {
  Entity, PrimaryGeneratedColumn, Column,
  OneToMany, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn
} from "typeorm";
import { BlogComment } from "./BlogComment";
import { BlogCategory } from "./BlogCategory";

@Entity("blogs")
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "title", length: 500 })
  title: string;

  @Column({ name: "description", length: 1000 })
  description: string;

  @Column({ name: "thumbnail", length: 500 })
  thumbnail: string;

  @Column({ name: "slug", length: 1000 })
  slug: string;

  @Column({ name: "components", type: "text", nullable: true })
  components: string;

  @Column({ name: "css", type: "text", nullable: true })
  css: string;

  @Column({ name: "pagedata", type: "text", nullable: true })
  pagedata: string;

  @Column({ name: "status", default: true, nullable: true })
  status: boolean;

  @Column({ name: "is_deleted", default: false })
  isDeleted: boolean;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @OneToMany(() => BlogComment, (comment) => comment.blog)
  blogComments: BlogComment[];

  @OneToMany(() => BlogCategory, (bc) => bc.blog)
  blogCategories: BlogCategory[];
}