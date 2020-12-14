import { Injectable } from '@nestjs/common';
import CreateGenreDto from '../user/dto/create-genre.dto';
import GenreEntity from '../db/genre.entity';

@Injectable()
export default class GenreServices {
  async insert(genreDetails: CreateGenreDto): Promise<GenreEntity> {
    const genreEntity: GenreEntity = GenreEntity.create();
    const { type } = genreDetails;

    genreEntity.type = type;
    await GenreEntity.save(genreEntity);
    return genreEntity;
  }
  async getAllGenre(): Promise<GenreEntity[]> {
    return await GenreEntity.find();
  }
  async deleteGenre(genreID: number): Promise<GenreEntity> {
    const genre = await GenreEntity.findOne({
      where: { id: genreID },
    });
    return await genre.remove();
  }
  async changeGenre(
    genreID: number,
    genreDetails: CreateGenreDto,
  ): Promise<GenreEntity> {
    const genre = await GenreEntity.findOne({
      where: { id: genreID },
    });
    genre.type = genreDetails.type;
    return await genre.save();
  }
}
