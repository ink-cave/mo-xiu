import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true, length: 50 })
  code!: string;

  @Column({ length: 100 })
  name!: string;

  @Column({ length: 255, nullable: true })
  description?: string;

  @Column({ type: 'enum', enum: ['menu', 'button'], default: 'menu' })
  type!: 'menu' | 'button';

  @Column({ nullable: true })
  parentId?: number;

  @Column({ length: 255, nullable: true })
  path?: string;

  @Column({ length: 50, nullable: true })
  icon?: string;

  @Column({ default: 0 })
  sort!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
