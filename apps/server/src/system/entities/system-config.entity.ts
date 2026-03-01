import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class SystemConfig {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, default: '后台管理系统' })
  systemName: string;

  @Column({ length: 255, nullable: true })
  systemLogo: string;

  @Column({ default: true })
  captchaEnabled: boolean;

  @Column({ default: 24 })
  sessionTimeout: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
