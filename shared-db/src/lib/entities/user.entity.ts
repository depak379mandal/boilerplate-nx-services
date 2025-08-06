import {
  Entity, PrimaryGeneratedColumn, Column,
  OneToMany
} from "typeorm";
import { BlogComment } from "./BlogComment";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 255, unique: true })
  email: string;

  @OneToMany(() => BlogComment, (comment) => comment.user)
  blogComments: BlogComment[];
}