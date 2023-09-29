import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TaskService } from './task.service';
import { CitiesPopulationResponseDTO } from './dtos/cities-population-response.dto';

@ApiTags('task')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('city-members-count')
  @ApiOperation({
    summary: 'Get the count of city members sorted by count DESC',
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: CitiesPopulationResponseDTO,
  })
  async getCityMembersCount(): Promise<CitiesPopulationResponseDTO> {
    return await this.taskService.getCityMembersCount();
  }
}
