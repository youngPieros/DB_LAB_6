import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserServices } from './user.service';
import CreateUserDto from './dto/craete-user.dto';
import { ApiBearerAuth, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly usersServices: UserServices) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
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

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiResponse({ status: 200, description: 'get all users' })
  getAll() {
    return this.usersServices.getAllUsers();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('books')
  @ApiResponse({ status: 200, description: 'get all books of the user' })
  @ApiQuery({
    name: 'userID',
    required: true,
    type: Number,
    description: 'id of the user that you want see their books',
  })
  getBooks(@Query('userID') userID: number) {
    return this.usersServices.getBooksOfUser(userID);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete()
  @ApiResponse({ status: 200, description: 'remove user' })
  removeGenre(@Query('userID') userID: number) {
    return this.usersServices.deleteUser(userID);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put()
  @ApiResponse({ status: 200, description: 'change name of user' })
  changeBook(@Query('userID') userID: number, @Body() user: CreateUserDto) {
    return this.usersServices.changeUser(userID, user);
  }
}
