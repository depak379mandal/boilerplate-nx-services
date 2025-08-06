import {
  Entity, PrimaryGeneratedColumn, Column,
  ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn
} from "typeorm";
import { Faq } from "./Faq";
import { PageRevision } from "./PageRevision";

@Entity("pages")
export class Page {
  @PrimaryGeneratedColumn()
  id: number;

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

  @Column({ default: false })
  isDeleted: boolean;

  @ManyToOne(() => Faq, (faq) => faq.pages, { nullable: true })
  faq: Faq;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => PageRevision, (revision) => revision.page)
  pageRevisions: PageRevision[];
}