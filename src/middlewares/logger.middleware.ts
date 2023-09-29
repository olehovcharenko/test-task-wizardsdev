import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private readonly httpService: HttpService) {}

  async use(req: Request, res: Response, next: Function) {
    const start = Date.now();
    res.on('finish', async () => {
      const requestDuration = Date.now() - start;
      const requestData = req.body;
      const responseData = res;
      const httpStatus = res.statusCode;

      console.log({
        requestDuration,
        requestData,
        responseData,
        httpStatus,
      });

      this.httpService.post('http://localhost:8765/logging', {
        requestDuration,
        requestData,
        responseData,
        httpStatus,
      });
    });

    next();
  }
}
