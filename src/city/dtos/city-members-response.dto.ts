import { ApiProperty } from '@nestjs/swagger';
import { CityMembersDTO } from '../interfaces/city-members.interface';

export class CityMembersResponseDTO {
  @ApiProperty({ type: [CityMembersDTO] })
  cityMembers: CityMembersDTO[];
}
