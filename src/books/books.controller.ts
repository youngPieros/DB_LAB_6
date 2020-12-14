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
import CreateBookDto from '../user/dto/create-book.dto';
import BookEntity from '../db/book.entity';
import { BooksService } from './books.service';
import { ApiBearerAuth, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('post')
  @ApiResponse({ status: 200, description: 'create new book' })
  @ApiQuery({
    name: 'book name',
    required: true,
    type: String,
  })
  @ApiQuery({
    name: 'user Id',
    required: true,
    type: String,
    description: 'id of the user',
  })
  @ApiQuery({
    name: 'genre IDs',
    required: true,
    type: Array,
    description: 'array of genre IDs',
  })
  postBook(@Body() book: CreateBookDto) {
    return this.booksService.insert(book);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiResponse({ status: 200, description: 'get all books' })
  getAll() {
    return this.booksService.getAllBooks();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete()
  @ApiResponse({ status: 200, description: 'remove book' })
  removeBook(@Query('bookID') bookID: number) {
    return this.booksService.removeBook(bookID);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put()
  @ApiResponse({ status: 200, description: "change book's name" })
  changeBook(@Query('bookID') bookID: number, @Body() book: CreateBookDto) {
    return this.booksService.changeBook(bookID, book);
  }
}
