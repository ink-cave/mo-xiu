import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity('sys_menu')
export class Menu {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  name: string = '';

  @Column()
  type: string = '';

  @Column({ nullable: true })
  parentId?: number | null;

  @Column({ nullable: true })
  path?: string;

  @Column({ nullable: true })
  component?: string;

  @Column({ nullable: true })
  permission?: string;

  @Column({ nullable: true })
  icon?: string;

  @Column({ default: 0 })
  sort: number = 0;

  @Column({ default: 1 })
  status: number = 1;

  @ManyToOne(() => Menu, (menu) => menu.children)
  parent?: Menu;

  @OneToMany(() => Menu, (menu) => menu.parent)
  children: Menu[];
}
