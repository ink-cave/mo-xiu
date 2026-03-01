import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';
import { Permission } from './entities/permission.entity';
import { RolePermission } from './entities/role-permission.entity';
import { Role } from './entities/role.entity';
import { Menu } from '../menu/entities/menu.entity';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule,
    TypeOrmModule.forFeature([Permission, RolePermission, Role, Menu]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('jwt.secret') || 'your-secret-key',
        signOptions: { expiresIn: configService.get('jwt.expiresIn') || 3600 },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [JwtStrategy, PermissionService],
  controllers: [PermissionController],
  exports: [JwtModule, PassportModule, PermissionService],
})
export class AuthModule {}
