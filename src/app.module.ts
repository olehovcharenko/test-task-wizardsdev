import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseProvider } from './database.provider';
import { LoggerModule } from './logger/logger.module';
import { CityController } from './city/city.controller';
import { CityService } from './city/city.service';
import { CityModule } from './city/city.module';

@Module({
  imports: [CityModule, LoggerModule],
  controllers: [AppController, CityController],
  providers: [AppService, CityService, databaseProvider],
})
export class AppModule {}
