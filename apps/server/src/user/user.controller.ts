import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AuthGuard } from '@nestjs/passport';
import type { CreateUserDto } from './dto/create-user.dto';
import type { LoginUserDto } from './dto/login-user.dto';
import type { UpdateUserDto } from './dto/update-user.dto';
import { User, UserRole } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createUserDto: CreateUserDto, @Request() req) {
    // 从认证中间件获取当前用户
    const currentUser = req.user as User;
    // 只有管理员可以创建用户
    if (currentUser.role !== 'admin') {
      throw new ForbiddenException('只有管理员可以创建用户');
    }
    return this.userService.create(createUserDto);
  }

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    // 注册接口，任何人都可以调用
    // 确保注册的用户角色为other
    createUserDto.role = UserRole.OTHER;
    return this.userService.create(createUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  logout() {
    // 退出登录接口，实际的token失效逻辑在前端处理
    return { message: '退出登录成功' };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getCurrentUser(@Request() req) {
    // 从认证中间件获取当前用户
    const currentUser = req.user as User;
    return currentUser;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(@Request() req) {
    // 从认证中间件获取当前用户
    const currentUser = req.user as User;
    return this.userService.findAll(currentUser);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    // 从认证中间件获取当前用户
    const currentUser = req.user as User;
    // 只有管理员或用户本人可以获取用户信息
    if (currentUser.role !== 'admin' && currentUser.id !== +id) {
      throw new ForbiddenException('没有权限获取该用户信息');
    }
    return this.userService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req,
  ) {
    // 从认证中间件获取当前用户
    const currentUser = req.user as User;
    const userId = +id;

    // 获取要修改的用户信息
    const targetUser = await this.userService.findOne(userId);

    // 检查是否是超级管理员账户
    const isSuperAdminUser = targetUser.role === 'super_admin';
    // 检查是否是管理员账户
    const isAdminUser = targetUser.role === 'admin';

    // 只有超级管理员和管理员可以修改其他用户
    if (
      currentUser.role !== 'super_admin' &&
      currentUser.role !== 'admin' &&
      currentUser.id !== userId
    ) {
      throw new ForbiddenException('没有权限修改其他用户');
    }

    // 管理员不能修改超级管理员
    if (currentUser.role === 'admin' && isSuperAdminUser) {
      throw new ForbiddenException('管理员不能修改超级管理员');
    }

    // 只有超级管理员或账户本人可以修改管理员账户
    if (
      isAdminUser &&
      currentUser.role !== 'super_admin' &&
      currentUser.id !== userId
    ) {
      throw new ForbiddenException(
        '只有超级管理员或管理员本人可以修改管理员账户',
      );
    }

    // 不能禁用超级管理员账户
    if (isSuperAdminUser && updateUserDto.status === 'disabled') {
      throw new ForbiddenException('不能禁用超级管理员账户');
    }

    return this.userService.update(userId, updateUserDto, currentUser);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {
    // 从认证中间件获取当前用户
    const currentUser = req.user as User;
    const userId = +id;

    // 获取要删除的用户信息
    const targetUser = await this.userService.findOne(userId);

    // 检查是否是超级管理员账户
    const isSuperAdminUser = targetUser.role === 'super_admin';
    // 检查是否是管理员账户
    const isAdminUser = targetUser.role === 'admin';

    // 不能删除超级管理员账户
    if (isSuperAdminUser) {
      throw new ForbiddenException('不能删除超级管理员账户');
    }

    // 只有超级管理员可以删除管理员账户
    if (isAdminUser && currentUser.role !== 'super_admin') {
      throw new ForbiddenException('只有超级管理员可以删除管理员账户');
    }

    // 只有超级管理员和管理员可以删除用户
    if (currentUser.role !== 'super_admin' && currentUser.role !== 'admin') {
      throw new ForbiddenException('只有管理员可以删除用户');
    }

    return this.userService.remove(userId, currentUser);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('change-password')
  async changePassword(
    @Body() body: { oldPassword: string; newPassword: string },
    @Request() req,
  ) {
    // 从认证中间件获取当前用户
    const currentUser = req.user as User;
    return this.userService.changePassword(
      currentUser.id,
      body.oldPassword,
      body.newPassword,
    );
  }

  // 上传用户头像
  @UseGuards(AuthGuard('jwt'))
  @Post('upload-avatar')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/avatars',
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
  async uploadAvatar(@UploadedFile() file: Express.Multer.File) {
    // 返回文件URL
    const fileUrl = `/uploads/avatars/${file.filename}`;
    return { url: fileUrl };
  }
}
