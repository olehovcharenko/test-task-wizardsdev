import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseProvider } from './database.provider';
import { CityController } from './city/city.controller';
import { CityService } from './city/city.service';
import { CityModule } from './city/city.module';
import { MiddlewareConsumer } from '@nestjs/common';
import { LoggingMiddleware } from './middlewares/logger.middleware';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [CityModule, HttpModule],
  controllers: [AppController, CityController],
  providers: [AppService, CityService, databaseProvider],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
