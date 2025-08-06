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

  @Column({ length: 500 })
  title: string;

  @Column({ length: 1000 })
  description: string;

  @Column({ length: 500 })
  thumbnail: string;

  @Column({ length: 1000 })
  slug: string;

  @Column({ type: "text", nullable: true })
  components: string;

  @Column({ type: "text", nullable: true })
  css: string;

  @Column({ type: "text", nullable: true })
  pagedata: string;

  @Column({ default: true, nullable: true })
  status: boolean;

  @Column({ default: false })
  isDeleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => BlogComment, (comment) => comment.blog)
  blogComments: BlogComment[];

  @OneToMany(() => BlogCategory, (bc) => bc.blog)
  blogCategories: BlogCategory[];
}