import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import TaskEntity from './task.entity';

@Entity()
export default class TaskCategoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @ManyToOne((type) => TaskEntity, (task) => task.category)
  task: TaskEntity;
}
