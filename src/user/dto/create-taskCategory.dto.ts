import { ApiProperty } from '@nestjs/swagger';

export default class CreateTaskCategoryDto {
  @ApiProperty({
    description: 'Category Name',
  })
  readonly name: string;
}
