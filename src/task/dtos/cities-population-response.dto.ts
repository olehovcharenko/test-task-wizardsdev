import { ICityPopulation } from '../interfaces/city-population.interface';
import { ApiProperty } from '@nestjs/swagger';

export class CitiesPopulationResponseDTO {
  @ApiProperty({ type: [ICityPopulation] })
  citiesPopulation: ICityPopulation[];
}
