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

  @Column({ length: 45 })
  title: string;

  @Column({ length: 500 })
  description: string;

  @Column({ default: true, nullable: true })
  template: boolean;

  @Column({ type: "text" })
  data: string;

  @Column({ default: true, nullable: true })
  status: boolean;

  @Column({ default: false })
  isDeleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Page, (page) => page.faq)
  pages: Page[];

  @OneToMany(() => PageRevision, (revision) => revision.faq)
  pageRevisions: PageRevision[];
}