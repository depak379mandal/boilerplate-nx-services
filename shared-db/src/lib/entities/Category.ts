import {
  Entity, PrimaryGeneratedColumn, Column,
  OneToMany, CreateDateColumn, UpdateDateColumn
} from "typeorm";
import { BlogCategory } from "./BlogCategory";

@Entity("categories")
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column({ length: 500 })
  description: string;

  @Column({ length: 45 })
  slug: string;

  @Column({ default: true, nullable: true })
  status: boolean;

  @Column({ default: false })
  isDeleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => BlogCategory, (bc) => bc.category)
  blogCategories: BlogCategory[];
}