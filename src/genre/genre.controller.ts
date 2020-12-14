import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import GenreServices from './genre.service';
import CreateGenreDto from '../user/dto/create-genre.dto';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('genre')
export default class GenreController {
  constructor(private readonly genreServices: GenreServices) {}

  @Post('post')
  @ApiResponse({ status: 200, description: 'create new genre' })
  @ApiQuery({
    name: 'name',
    required: true,
    type: String,
  })
  postGenre(@Body() genre: CreateGenreDto) {
    return this.genreServices.insert(genre);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'get all defined book genres' })
  getAll() {
    return this.genreServices.getAllGenre();
  }

  @Delete()
  @ApiResponse({ status: 200, description: 'remove genre' })
  removeGenre(@Query('genreID') genreID: number) {
    return this.genreServices.deleteGenre(genreID);
  }

  @Put()
  @ApiResponse({ status: 200, description: "change genre's type" })
  changeBook(@Query('genreID') genreID: number, @Body() genre: CreateGenreDto) {
    return this.genreServices.changeGenre(genreID, genre);
  }
}
