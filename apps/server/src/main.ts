import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { GlobalExceptionFilter } from './common/filters/exception.filter';
import * as express from 'express';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // 配置 CORS
  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });
  // 配置静态文件服务
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
  // 添加全局 API 前缀
  app.setGlobalPrefix('api');
  // 注册全局响应拦截器
  app.useGlobalInterceptors(new ResponseInterceptor());
  // 注册全局异常过滤器
  app.useGlobalFilters(new GlobalExceptionFilter());

  const port = configService.get<number>('app.port') ?? 9999;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
void bootstrap();
