import { ApiProperty } from '@nestjs/swagger';

export default class CreateGenreDto {
  @ApiProperty({
    description: 'Genre Type > ',
  })
  readonly type: string;
}
