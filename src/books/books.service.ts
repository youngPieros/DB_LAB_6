import { Injectable } from '@nestjs/common';
import CreateBookDto from '../user/dto/create-book.dto';
import BookEntity from '../db/book.entity';
import UserEntity from '../db/user.entity';
import GenreEntity from '../db/genre.entity';

@Injectable()
export class BooksService {
  async insert(bookDetails: CreateBookDto): Promise<BookEntity> {
    const { name, userID, genreIDs } = bookDetails;
    const book = new BookEntity();
    book.name = name;
    book.user = await UserEntity.findOne(userID);
    book.genres = [];
    for (let i = 0; i < genreIDs.length; i++) {
      const genre = await GenreEntity.findOne(genreIDs[i]);
      book.genres.push(genre);
    }
    await book.save();
    return book;
  }
  async getAllBooks(): Promise<BookEntity[]> {
    // const user: UserEntity = await UserEntity.findOne({where: {id: 2}, relations: ['books']});
    return BookEntity.find();
  }
}
