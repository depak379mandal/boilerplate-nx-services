import {
  Entity, PrimaryGeneratedColumn, Column,
  ManyToOne, CreateDateColumn, UpdateDateColumn
} from "typeorm";
import { Page } from "./Page";
import { Faq } from "./Faq";

@Entity("page_revisions")
export class PageRevision {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Page, (page) => page.pageRevisions)
  page: Page;

  @Column({ length: 500 })
  title: string;

  @Column({ length: 30, nullable: true })
  type: string;

  @Column({ length: 1000 })
  description: string;

  @Column({ length: 1000 })
  slug: string;

  @Column({ type: "text", nullable: true })
  components: string;

  @Column({ type: "text", nullable: true })
  css: string;

  @Column({ type: "text", nullable: true })
  customCss: string;

  @Column({ type: "text", nullable: true })
  pagedata: string;

  @Column({ default: true, nullable: true })
  status: boolean;

  @Column({ default: false })
  includeSidebar: boolean;

  @ManyToOne(() => Faq, (faq) => faq.pageRevisions, { nullable: true })
  faq: Faq;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}