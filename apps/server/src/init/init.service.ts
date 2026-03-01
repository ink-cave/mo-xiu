import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User, UserRole, UserStatus } from '../user/entities/user.entity';
import { PermissionService } from '../auth/permission.service';
import { SystemService } from '../system/system.service';

@Injectable()
export class InitService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private permissionService: PermissionService,
    private systemService: SystemService,
  ) {}

  async onModuleInit() {
    // 检查并创建或更新admin账号为超级管理员
    await this.initializeAdminUser();
    // 初始化默认权限
    await this.initializeDefaultPermissions();
    // 初始化系统配置
    await this.initializeSystemConfig();
  }

  private async initializeAdminUser() {
    let adminUser = await this.userRepository.findOneBy({ username: 'admin' });
    if (!adminUser) {
      // 创建新的超级管理员账户
      const hashedPassword = await bcrypt.hash('admin123', 10);
      adminUser = this.userRepository.create({
        username: 'admin',
        email: 'admin@example.com',
        password: hashedPassword,
        role: UserRole.SUPER_ADMIN,
        status: UserStatus.ACTIVE,
      });
      await this.userRepository.save(adminUser);
      console.log('Super admin account created successfully');
    } else if (adminUser.role !== UserRole.SUPER_ADMIN) {
      // 更新现有admin账户为超级管理员
      adminUser.role = UserRole.SUPER_ADMIN;
      adminUser.status = UserStatus.ACTIVE;
      await this.userRepository.save(adminUser);
      console.log('Admin account updated to super admin successfully');
    }
  }

  private async initializeDefaultPermissions() {
    await this.permissionService.initializeDefaultPermissions();
    console.log('Default permissions initialized successfully');
  }

  private async initializeSystemConfig() {
    await this.systemService.initializeDefaultConfig();
    console.log('System configuration initialized successfully');
  }
}
