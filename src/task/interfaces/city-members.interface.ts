import { ApiProperty } from '@nestjs/swagger';

export class IMembers {
  @ApiProperty({ description: 'Name of the member', example: 'Mike' })
  firstName: string;

  @ApiProperty({
    description: 'Number of members',
    example: 2,
  })
  count: number;
}

export class ICityMembers {
  @ApiProperty({ description: 'Name of the city', example: 'Dnipro' })
  city: string;

  @ApiProperty({
    description: 'Number of residents in the city',
    example: 10000,
    type: IMembers,
  })
  members: IMembers[];
}
