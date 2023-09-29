import { ApiProperty } from '@nestjs/swagger';

export class ICityPopulation {
  @ApiProperty({ description: 'Name of the city', example: 'Dnipro' })
  city: string;

  @ApiProperty({
    description: 'Number of residents in the city',
    example: 10000,
  })
  count: number;
}
