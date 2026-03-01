import {
  Body,
  Controller,
  Get,
  Put,
  Post,
  UseGuards,
  Request,
  ForbiddenException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AuthGuard } from '@nestjs/passport';
import { User, UserRole } from '../user/entities/user.entity';
import { SystemService } from './system.service';

@Controller('system')
export class SystemController {
  constructor(private readonly systemService: SystemService) {}

  // 获取系统配置
  @UseGuards(AuthGuard('jwt'))
  @Get('config')
  async getSystemConfig() {
    return this.systemService.getSystemConfig();
  }

  // 更新系统配置
  @UseGuards(AuthGuard('jwt'))
  @Put('config')
  async updateSystemConfig(@Body() config: any, @Request() req) {
    // 从认证中间件获取当前用户
    const currentUser = req.user as User;

    // 只有超级管理员可以修改系统配置
    if (currentUser.role !== UserRole.SUPER_ADMIN) {
      throw new ForbiddenException('只有超级管理员可以修改系统配置');
    }

    // 更新系统配置
    return this.systemService.updateSystemConfig(config);
  }

  // 获取系统日志
  @UseGuards(AuthGuard('jwt'))
  @Get('log')
  getSystemLog() {
    // 模拟系统日志
    return {
      data: [
        { id: 1, message: '系统启动', time: new Date().toISOString() },
        { id: 2, message: '用户登录', time: new Date().toISOString() },
      ],
      total: 2,
    };
  }

  // 上传文件（Logo）
  @UseGuards(AuthGuard('jwt'))
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (_req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Request() req) {
    // 从认证中间件获取当前用户
    const currentUser = req.user as User;

    // 只有超级管理员可以上传文件
    if (currentUser.role !== UserRole.SUPER_ADMIN) {
      throw new ForbiddenException('只有超级管理员可以上传文件');
    }

    // 返回文件URL
    const fileUrl = `/uploads/${file.filename}`;
    return { url: fileUrl };
  }
}
