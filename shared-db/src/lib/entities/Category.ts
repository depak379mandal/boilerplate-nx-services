import {
  Entity, PrimaryGeneratedColumn, Column,
  OneToMany, CreateDateColumn, UpdateDateColumn
} from "typeorm";
import { BlogCategory } from "./BlogCategory";

@Entity("categories")
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "title", length: 255, type: "varchar" })
  title: string;

  @Column({ name: "description", length: 500, type: "varchar" })
  description: string;

  @Column({ name: "slug", length: 45, type: "varchar" })
  slug: string;

  @Column({ name: "status", default: true, nullable: true, type: "boolean" })
  status: boolean;

  @Column({ name: "is_deleted", default: false, type: "boolean" })
  isDeleted: boolean;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @OneToMany(() => BlogCategory, (bc) => bc.category)
  blogCategories: BlogCategory[];
}