import { CallHandler, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(_, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        // 如果已经是统一格式，直接返回
        if (typeof data === 'object' && data !== null && 'code' in data) {
          return data;
        }

        // 统一响应格式
        return {
          success: true,
          code: 200,
          data,
          msg: '请求成功',
        };
      }),
    );
  }
}
