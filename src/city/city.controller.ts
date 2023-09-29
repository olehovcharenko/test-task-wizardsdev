import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CitiesPopulationResponseDTO } from './dtos/cities-population-response.dto';
import { CityService } from './city.service';
import { CityMembersResponseDTO } from './dtos/city-members-response.dto';

@ApiTags('city')
@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get('members-count')
  @ApiOperation({
    summary: 'Get the count of city members sorted by count DESC',
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: CitiesPopulationResponseDTO,
  })
  async getMembersCount(): Promise<CitiesPopulationResponseDTO> {
    return await this.cityService.getMembersCount();
  }

  @Get('members-with-same-first-name')
  @ApiOperation({
    summary: 'Get the count of city members with same first name',
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: CityMembersResponseDTO,
  })
  async getMembersWithSameFirstName(): Promise<CityMembersResponseDTO> {
    return await this.cityService.getMembersWithSameFirstName();
  }
}
