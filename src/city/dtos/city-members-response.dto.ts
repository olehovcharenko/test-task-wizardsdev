import { ApiProperty } from '@nestjs/swagger';
import { ICityMembers } from '../interfaces/city-members.interface';

export class CitiesPopulationResponseDTO {
  @ApiProperty({ type: [ICityMembers] })
  cityMembers: ICityMembers[];
}
