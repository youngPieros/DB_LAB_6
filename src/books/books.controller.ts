import { Body, Controller, Get, Post } from '@nestjs/common';
import CreateBookDto from '../user/dto/create-book.dto';
import BookEntity from '../db/book.entity';
import { BooksService } from './books.service';
import {ApiQuery, ApiResponse} from "@nestjs/swagger";

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}
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
  @Get()
  @ApiResponse({ status: 200, description: 'get all books' })
  getAll() {
    return this.booksService.getAllBooks();
  }
}
