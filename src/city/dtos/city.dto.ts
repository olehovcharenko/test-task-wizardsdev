import { ApiProperty } from '@nestjs/swagger';

export class CityDTO {
  @ApiProperty({ description: 'Id of the city', example: 2 })
  id: number;

  @ApiProperty({ description: 'Name of the city', example: 'Odesa' })
  name: string;

  @ApiProperty({
    description: 'Description of the city',
    example: 'Seaside city',
  })
  description: string;
}
