import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Log {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "body", type: 'json', nullable: true })
  body: Record<string, any>;

  @Column({ name: "query", type: 'json', nullable: true })
  query: Record<string, any>;

  @Column({ name: "params", type: 'json', nullable: true })
  params: Record<string, any>;

  @Column({ name: "headers", type: 'json', nullable: true })
  headers: Record<string, any>;

  @Column({ name: "response", type: 'json', nullable: true })
  response: string;

  @Column({ name: "error", type: 'json', nullable: true })
  error: Record<string, any>;

  @Column({ name: "stack", type: 'json', nullable: true })
  stack: Record<string, any>;

  @Column({ name: "method", type: 'varchar' })
  method: string;

  @Column({ name: "url", type: 'varchar' })
  url: string;

  @CreateDateColumn({ name: "created_at", type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: 'timestamp' })
  updatedAt: Date;
}
