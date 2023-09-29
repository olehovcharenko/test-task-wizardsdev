import { ApiProperty } from '@nestjs/swagger';

export class CityDTO {
  @ApiProperty({ description: 'Id of city', example: 2 })
  id: number;

  @ApiProperty({ description: 'Name of city', example: 'Odesa' })
  name: string;

  @ApiProperty({ description: 'Cities population', example: 10000 })
  population: number;
}
