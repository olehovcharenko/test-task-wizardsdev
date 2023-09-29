import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseProvider } from './database.provider';
import { CityController } from './city/city.controller';
import { CityService } from './city/city.service';
import { CityModule } from './city/city.module';
import { LoggingInterceptor } from './interceptors/logger.interceptor';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [CityModule, HttpModule],
  controllers: [AppController, CityController],
  providers: [AppService, CityService, LoggingInterceptor, databaseProvider],
})
export class AppModule {}
