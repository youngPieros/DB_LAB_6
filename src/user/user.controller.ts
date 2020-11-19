import { Body, Controller, Get, ParseIntPipe, Post, Put } from '@nestjs/common';
import { UserServices } from './user.service';
import CreateUserDto from './dto/craete-user.dto';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(private readonly usersServices: UserServices) {}

  //'postUser()' will handle the creating of new User
  @Post('post')
  @ApiResponse({ status: 200, description: 'create new user' })
  @ApiQuery({
    name: 'name',
    required: true,
    type: String,
  })
  postUser(@Body() user: CreateUserDto) {
    return this.usersServices.insert(user);
  }
  // 'getAll()' returns the list of all the existing users in the database
  @Get()
  @ApiResponse({ status: 200, description: 'get all users' })
  getAll() {
    return this.usersServices.getAllUsers();
  }

  //'getBooks()' return all the books which are associated with the user
  // provided through 'userID' by the request
  @Get('books')
  @ApiResponse({ status: 200, description: 'get all books of the user' })
  @ApiQuery({
    name: 'user ID',
    required: true,
    type: String,
    description: 'id of the user that you want see their books',
  })
  getBooks(@Body('userID', ParseIntPipe) userID: number) {
    return this.usersServices.getBooksOfUser(userID);
  }
}
