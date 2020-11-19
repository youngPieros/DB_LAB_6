import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloModule } from './hello/hello.module';
import { BooksModule } from './books/books.module';
import { UserModule } from './user/user.module';
import { GenreModule } from './genre/genre.module';
import UserEntity from './db/user.entity';
import BookEntity from './db/book.entity';
import GenreEntity from './db/genre.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    HelloModule,
    BooksModule,
    UserModule,
    GenreModule,
    TypeOrmModule.forFeature([UserEntity, BookEntity, GenreEntity]),
    TypeOrmModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
