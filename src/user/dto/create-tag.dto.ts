import { ApiProperty } from '@nestjs/swagger';

export default class CreateTagDto {
  @ApiProperty({
    description: 'Tag Name',
  })
  readonly name: string;
}
