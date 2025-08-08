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

  @Column({ name: "title", length: 45 })
  title: string;

  @Column({ name: "description", length: 500 })
  description: string;

  @Column({ name: "template", default: true, nullable: true })
  template: boolean;

  @Column({ name: "data", type: "text" })
  data: string;

  @Column({ name: "status", default: true, nullable: true })
  status: boolean;

  @Column({ name: "is_deleted", default: false })
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