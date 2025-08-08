import {
  Entity, PrimaryGeneratedColumn, Column,
  OneToMany, CreateDateColumn, UpdateDateColumn
} from "typeorm";
import { Page } from "./Page";
import { PageRevision } from "./PageRevision";

@Entity("faqs")
export class Faq {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "title", length: 45, type: "varchar" })
  title: string;

  @Column({ name: "description", length: 500, type: "varchar" })
  description: string;

  @Column({ name: "template", default: true, nullable: true, type: "boolean" })
  template: boolean;

  @Column({ name: "data", type: "text", nullable: true })
  data: string;

  @Column({ name: "status", default: true, nullable: true, type: "boolean" })
  status: boolean;

  @Column({ name: "is_deleted", default: false, type: "boolean" })
  isDeleted: boolean;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @OneToMany(() => Page, (page) => page.faq)
  pages: Page[];

  @OneToMany(() => PageRevision, (revision) => revision.faq)
  pageRevisions: PageRevision[];
}