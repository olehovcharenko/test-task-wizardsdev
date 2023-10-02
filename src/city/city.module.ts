import { Module } from '@nestjs/common';
import { databaseProvider } from '../providers/database.provider';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [CityController],
  providers: [CityService, databaseProvider],
})
export class CityModule {}
