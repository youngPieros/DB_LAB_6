import { ApiProperty } from '@nestjs/swagger';

export default class CreateBookDto {
  @ApiProperty({
    description: 'Book Name > ',
  })
  readonly name: string;
  @ApiProperty({
    description: 'ID Of The User > ',
  })
  readonly userID: number;
  @ApiProperty({
    description: 'Genre IDs(look at /genre) > ',
  })
  readonly genreIDs: number[];
}
