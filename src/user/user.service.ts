import { Injectable } from '@nestjs/common';
import UserEntity from '../db/user.entity';
import CreateUserDto from './dto/craete-user.dto';
import BookEntity from '../db/book.entity';

@Injectable()
export class UserServices {
  async insert(userDetails: CreateUserDto): Promise<UserEntity> {
    const userEntity: UserEntity = UserEntity.create();
    const { name } = userDetails;
    userEntity.name = name;
    await UserEntity.save(userEntity);
    return userEntity;
  }
  async getAllUsers(): Promise<UserEntity[]> {
    return await UserEntity.find();
  }
  async getBooksOfUser(userID: number): Promise<BookEntity[]> {
    const user: UserEntity = await UserEntity.findOne({
      where: { id: userID },
      relations: ['books'],
    });
    return user.books;
  }
  async deleteUser(userID: number): Promise<UserEntity> {
    const user: UserEntity = await UserEntity.findOne({
      where: { id: userID },
    });
    return await user.remove();
  }
  async changeUser(
    userID: number,
    userDetails: CreateUserDto,
  ): Promise<UserEntity> {
    const user: UserEntity = await UserEntity.findOne({
      where: { id: userID },
    });
    user.name = userDetails.name;
    return await user.save({
      data: {
        name: userDetails.name,
      },
    });
  }
}
