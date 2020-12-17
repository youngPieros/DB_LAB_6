import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import UserEntity from './db/user.entity';
import TaskEntity from './db/task.entity';
import TaskItemEntity from './db/taskItem.entity';
import TaskCategoryEntity from './db/taskCategory.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { JwtStrategy } from './auth/jwt.strategy';
import { TodoModule } from './todo/todo.module';
import { TodoService } from './todo/todo.service';
import TagEntity from './db/tag.entity';
// import { TodoController } from './todo/todo.controller';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([
      UserEntity,
      TaskEntity,
      TaskItemEntity,
      TaskCategoryEntity,
      TagEntity,
    ]),
    TypeOrmModule.forRoot(),
    AuthModule,
    UsersModule,
    TodoModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
