import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
  IsNull,
} from 'typeorm';
import TaskItemEntity from './taskItem.entity';
import TaskCategoryEntity from './taskCategory.entity';
import UserEntity from './user.entity';
import TagEntity from './tag.entity';

@Entity()
export default class TaskEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @ManyToMany((type) => TagEntity)
  @JoinTable()
  tags: TagEntity[];

  @Column()
  isTextual: boolean;

  @Column({ nullable: true })
  text: string;

  @OneToMany(() => TaskItemEntity, (item) => item.task, {
    cascade: true,
  })
  items: TaskItemEntity[];

  @ManyToOne(() => TaskCategoryEntity)
  category: TaskCategoryEntity;

  @ManyToOne(() => UserEntity, (user) => user.tasks)
  user: UserEntity;
}
