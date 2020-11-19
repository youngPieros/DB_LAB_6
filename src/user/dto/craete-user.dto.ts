import { ApiProperty } from '@nestjs/swagger';

export default class CreateUserDto {
  @ApiProperty({
    description: 'Name Of User> ',
  })
  readonly name: string;
  readonly books: number[];
}
