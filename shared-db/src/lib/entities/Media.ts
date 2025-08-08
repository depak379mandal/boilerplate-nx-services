import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn
} from "typeorm";

@Entity("media")
export class Media {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "title", length: 255, type: "varchar" })
  title: string;

  @Column({ name: "url", length: 255, type: "varchar" })
  url: string;

  @Column({ name: "file_name", length: 255, type: "varchar" })
  fileName: string;

  @Column({ name: "type", length: 30, type: "varchar" })
  type: string;

  @Column({ name: "is_deleted", default: false, type: "boolean" })
  isDeleted: boolean;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}