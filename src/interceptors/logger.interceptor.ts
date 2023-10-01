import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { catchError, lastValueFrom, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly httpService: HttpService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = Date.now();
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    return next.handle().pipe(
      map((data) => {
        const requestDuration = Date.now() - start;
        const requestData = request.body;
        const responseData = data;
        const httpStatus = response.statusCode;

        lastValueFrom(
          this.httpService.post('http://localhost:8765/logging', {
            requestDuration,
            requestData,
            responseData,
            httpStatus,
          }),
        ).catch((error) => {
          console.error('Error sending data to logging endpoint:', error);
        });

        return data;
      }),
      catchError((error) => {
        return throwError(error);
      }),
    );
  }
}
