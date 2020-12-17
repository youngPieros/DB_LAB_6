import { ApiProperty } from '@nestjs/swagger';

export default class CreateTaskItemDto {
  @ApiProperty({
    description: 'Task Item Description',
  })
  readonly text: string;
}
