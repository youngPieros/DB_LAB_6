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
import GenreServices from './genre.service';
import CreateGenreDto from '../user/dto/create-genre.dto';
import { ApiBearerAuth, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('genre')
export default class GenreController {
  constructor(private readonly genreServices: GenreServices) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
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

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiResponse({ status: 200, description: 'get all defined book genres' })
  getAll() {
    return this.genreServices.getAllGenre();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete()
  @ApiResponse({ status: 200, description: 'remove genre' })
  removeGenre(@Query('genreID') genreID: number) {
    return this.genreServices.deleteGenre(genreID);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put()
  @ApiResponse({ status: 200, description: "change genre's type" })
  changeBook(@Query('genreID') genreID: number, @Body() genre: CreateGenreDto) {
    return this.genreServices.changeGenre(genreID, genre);
  }
}
