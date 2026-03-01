import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PermissionService } from './permission.service';
import type { Permission } from './entities/permission.entity';
import { User } from '../user/entities/user.entity';

@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  // 获取当前用户的权限
  @UseGuards(AuthGuard('jwt'))
  @Get('user')
  async getUserPermissions(@Request() req) {
    const user = req.user as User;
    return this.permissionService.getUserPermissions(user.role);
  }

  // 获取所有权限
  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.permissionService.findAll();
  }

  // 根据角色获取权限
  @UseGuards(AuthGuard('jwt'))
  @Get('role/:role')
  findByRole(@Param('role') role: string) {
    return this.permissionService.findByRole(role);
  }

  // 创建权限
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() permission: Partial<Permission>) {
    return this.permissionService.create(permission);
  }

  // 更新权限
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Param('id') id: string, @Body() permission: Partial<Permission>) {
    return this.permissionService.update(+id, permission);
  }

  // 删除权限
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.permissionService.remove(+id);
  }

  // 为角色分配权限
  @UseGuards(AuthGuard('jwt'))
  @Post('assign')
  assignPermissionToRole(@Body() body: { role: string; permissionId: number }) {
    return this.permissionService.assignPermissionToRole(
      body.role,
      body.permissionId,
    );
  }

  // 从角色中移除权限
  @UseGuards(AuthGuard('jwt'))
  @Post('remove')
  removePermissionFromRole(
    @Body() body: { role: string; permissionId: number },
  ) {
    return this.permissionService.removePermissionFromRole(
      body.role,
      body.permissionId,
    );
  }

  // 初始化默认权限
  @UseGuards(AuthGuard('jwt'))
  @Post('initialize')
  initializeDefaultPermissions() {
    return this.permissionService.initializeDefaultPermissions();
  }
}
