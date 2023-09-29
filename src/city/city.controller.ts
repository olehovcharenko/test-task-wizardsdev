import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { CityService } from './city.service';
import { CitiesPopulationResponseDTO } from './dtos/city-population.dto';
import { CityMembersResponseDTO } from './dtos/city-members.dto';
import { CityDTO } from './dtos/city.dto';
import { LoggingInterceptor } from '../interceptors/logger.interceptor';

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
  @UseInterceptors(LoggingInterceptor)
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
  @UseInterceptors(LoggingInterceptor)
  async getMembersWithSameFirstName(): Promise<CityMembersResponseDTO> {
    return await this.cityService.getMembersWithSameFirstName();
  }

  @Get('get-city-by-partial')
  @ApiOperation({
    summary: 'Get a city by partial name',
  })
  @ApiQuery({
    name: 'partialName',
    required: true,
    description: 'Partial name to filter cities',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: CityDTO,
  })
  @UseInterceptors(LoggingInterceptor)
  async getCityByPartialName(
    @Query('partialName') partialName: string,
  ): Promise<CityDTO[]> {
    return this.cityService.getCityByPartialName(partialName);
  }
}
