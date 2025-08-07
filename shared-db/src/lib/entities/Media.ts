import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn
} from "typeorm";

@Entity("media")
export class Media {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "title", length: 255 })
  title: string;

  @Column({ name: "url", length: 255 })
  url: string;

  @Column({ name: "file_name", length: 255 })
  fileName: string;

  @Column({ name: "type", length: 30 })
  type: string;

  @Column({ name: "is_deleted", default: false })
  isDeleted: boolean;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}