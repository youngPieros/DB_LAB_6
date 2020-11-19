import { Length, IsOptional, Min, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PersonDto {
  @Length(3, 10)
  @ApiProperty({
    description: 'Enter Your Name > ',
    minLength: 3,
    default: 'Iman',
    maxLength: 10,
  })
  name: string;

  @IsNumber()
  @IsOptional()
  @Min(1960)
  @ApiPropertyOptional({
    description: 'Optional',
    default: 1999,
    minimum: 1960,
  })
  year: number;
}
