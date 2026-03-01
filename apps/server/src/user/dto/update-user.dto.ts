import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserRole, UserStatus } from '../entities/user.entity';

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: '用户名必须是字符串' })
  @MinLength(3, { message: '用户名长度不能少于3个字符' })
  @MaxLength(50, { message: '用户名长度不能超过50个字符' })
  username?: string;

  @IsOptional()
  @IsString({ message: '邮箱必须是字符串' })
  @IsEmail({}, { message: '请输入有效的邮箱地址' })
  @MaxLength(100, { message: '邮箱长度不能超过100个字符' })
  email?: string;

  @IsOptional()
  @IsString({ message: '密码必须是字符串' })
  @MinLength(6, { message: '密码长度不能少于6个字符' })
  @MaxLength(100, { message: '密码长度不能超过100个字符' })
  password?: string;

  @IsOptional()
  @IsEnum(UserRole, { message: '角色必须是有效的角色类型' })
  role?: UserRole;

  @IsOptional()
  @IsEnum(UserStatus, { message: '状态必须是有效的状态类型' })
  status?: UserStatus;

  @IsOptional()
  @IsString({ message: '昵称必须是字符串' })
  @MaxLength(50, { message: '昵称长度不能超过50个字符' })
  nickname?: string;

  @IsOptional()
  @IsString({ message: '头像必须是字符串' })
  @MaxLength(255, { message: '头像URL长度不能超过255个字符' })
  avatar?: string;
}
