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

  @Column({ type: 'json' })
  body: Record<string, any>;

  @Column({ type: 'json' })
  query: Record<string, any>;

  @Column({ type: 'json' })
  params: Record<string, any>;

  @Column({ type: 'json' })
  headers: Record<string, any>;

  @Column({ type: 'json', nullable: true })
  response: string;

  @Column({ type: 'json', nullable: true })
  error: Record<string, any>;

  @Column({ type: 'json', nullable: true })
  stack: Record<string, any>;

  @Column({ type: 'varchar' })
  method: string;

  @Column({ type: 'varchar' })
  url: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
