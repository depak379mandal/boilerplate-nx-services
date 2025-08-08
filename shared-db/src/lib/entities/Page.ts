import {
  Entity, PrimaryGeneratedColumn, Column,
  ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, JoinColumn
} from "typeorm";
import { Faq } from "./Faq";
import { PageRevision } from "./PageRevision";

@Entity("pages")
export class Page {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "title", length: 500 })
  title: string;

  @Column({ name: "type", length: 30, nullable: true })
  type: string;

  @Column({ name: "description", length: 1000 })
  description: string;

  @Column({ name: "slug", length: 1000 })
  slug: string;

  @Column({ name: "components", type: "text", nullable: true })
  components: string;

  @Column({ name: "css", type: "text", nullable: true })
  css: string;

  @Column({ name: "custom_css", type: "text", nullable: true })
  customCss: string;

  @Column({ name: "pagedata", type: "text", nullable: true })
  pagedata: string;

  @Column({ name: "status", default: true, nullable: true })
  status: boolean;

  @Column({ name: "include_sidebar", default: false })
  includeSidebar: boolean;

  @Column({ name: "is_deleted", default: false })
  isDeleted: boolean;

  @ManyToOne(() => Faq, (faq) => faq.pages, { nullable: true })
  @JoinColumn({ name: "faq_id" })
  faq: Faq;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @OneToMany(() => PageRevision, (revision) => revision.page)
  pageRevisions: PageRevision[];
}