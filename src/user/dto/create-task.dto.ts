import { ApiProperty } from '@nestjs/swagger';
import CreateTaskCategoryDto from './create-taskCategory.dto';

export default class CreateTaskDto {
  @ApiProperty({
    description: 'Task Name',
  })
  readonly name: string;

  @ApiProperty({
    description: 'items',
  })
  readonly items: string[];

  @ApiProperty({
    description: 'Textual Task',
    nullable: true,
  })
  readonly text: string;

  @ApiProperty({
    description: 'Tags',
  })
  readonly tags: string[];

  @ApiProperty({
    description: 'Is Type of Task Textual',
  })
  readonly isTextual: boolean;

  @ApiProperty({
    description: 'Task Category',
  })
  readonly category: CreateTaskCategoryDto;
}
