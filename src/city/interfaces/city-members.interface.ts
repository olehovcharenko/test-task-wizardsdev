import { ApiProperty } from '@nestjs/swagger';

export class MembersDTO {
  @ApiProperty({ description: 'Name of the member', example: 'Mike' })
  firstName: string;

  @ApiProperty({
    description: 'Number of members',
    example: 2,
  })
  count: number;
}

export class CityMembersDTO {
  @ApiProperty({ description: 'Name of the city', example: 'Dnipro' })
  city: string;

  @ApiProperty({
    description: 'Number of residents in the city',
    example: 10000,
    type: MembersDTO,
  })
  members: MembersDTO[];
}

export interface ICityMembersQueryResult {
  city: string;
  first_name: string;
  count: number;
}
