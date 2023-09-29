import { Module } from '@nestjs/common';
import { databaseProvider } from '../database.provider';
import { CityController } from './city.controller';
import { CityService } from './city.service';

@Module({
  imports: [],
  controllers: [CityController],
  providers: [CityService, databaseProvider],
})
export class CityModule {}
