import { Injectable } from '@nestjs/common';
import CreateTaskDto from '../user/dto/create-task.dto';
import UserEntity from '../db/user.entity';
import TaskEntity from '../db/task.entity';
import TaskCategoryEntity from '../db/taskCategory.entity';
import TaskItemEntity from '../db/taskItem.entity';
import TagEntity from '../db/tag.entity';

@Injectable()
export class TodoService {
  async addTask(userID: number, taskDto: CreateTaskDto): Promise<TaskEntity> {
    const user: UserEntity = await UserEntity.findOne(userID);
    const task = TaskEntity.create();
    task.category = await this.getCategory(taskDto.category.name);
    if (task.category === null) {
      task.category = TaskCategoryEntity.create();
    }
    task.category.type = taskDto.category.name;
    await TaskCategoryEntity.save(task.category);
    task.name = taskDto.name;
    task.items = [];
    for (const item of taskDto.items) {
      const taskItem = TaskItemEntity.create();
      taskItem.text = item;
      taskItem.task = task;
      task.items.push(taskItem);
    }
    task.tags = [];
    for (const tagName of taskDto.tags) {
      let tag: TagEntity = await this.getTag(tagName);
      if (tag === null) {
        tag = await this.createTag(tagName);
      }
      task.tags.push(tag);
    }
    task.isTextual = taskDto.isTextual;
    task.user = user;
    task.text = taskDto.text;
    await task.save();
    for (const taskItem of task.items) {
      taskItem.task = null;
    }
    return task;
  }

  async deleteTask(taskId: number): Promise<TaskEntity> {
    const task = await TaskEntity.findOne({
      id: taskId,
    });
    const items = await TaskItemEntity.find({ task: task });
    await TaskItemEntity.remove(items);
    return await task.remove();
  }

  async deleteTaskItem(taskItemId: number): Promise<TaskItemEntity> {
    const taskItem = await TaskItemEntity.findOne(taskItemId);
    if (taskItem !== null) {
      return await taskItem.remove();
    }
  }

  async changeTask(
    taskId: number,
    taskDto: CreateTaskDto,
  ): Promise<TaskEntity> {
    let task;
    [[[task, task.category]]] = await Promise.all([
      Promise.all([
        Promise.all([
          TaskEntity.findOne(taskId),
          this.getCategory(taskDto.category.name),
        ]),
      ]),
    ]);
    if (task.category === null) {
      task.category = TaskCategoryEntity.create();
    }
    task.category.type = taskDto.category.name;
    await TaskCategoryEntity.save(task.category);
    task.name = taskDto.name;
    const items = await TaskItemEntity.find({ task: task });
    await TaskItemEntity.remove(items);
    task.items = [];
    for (const item of taskDto.items) {
      const taskItem = TaskItemEntity.create();
      taskItem.text = item;
      taskItem.task = task;
      task.items.push(taskItem);
    }
    task.tags = [];
    for (const tagName of taskDto.tags) {
      let tag: TagEntity = await this.getTag(tagName);
      if (tag === null) {
        tag = await this.createTag(tagName);
      }
      task.tags.push(tag);
    }
    task.isTextual = taskDto.isTextual;
    task.text = taskDto.text;
    await task.save();
    for (const taskItem of task.items) {
      taskItem.task = null;
    }
    return task;
  }

  async getTags() {
    return await TagEntity.find();
  }

  async getTag(tagName: string) {
    const tags = await TagEntity.find({
      name: tagName,
    });
    return tags.length > 0 ? tags[0] : null;
  }

  async createTag(tagName: string) {
    const tag = TagEntity.create();
    tag.name = tagName;
    return await tag.save();
  }

  async getCategories() {
    return await TaskCategoryEntity.find();
  }

  async getCategory(categoryType: string) {
    const categories = await TaskCategoryEntity.find({
      type: categoryType,
    });
    return categories.length > 0 ? categories[0] : null;
  }

  async createCategory(categoryType: string) {
    const category = TaskCategoryEntity.create();
    category.type = categoryType;
    return await category.save();
  }
}
