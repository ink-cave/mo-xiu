import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsString({ message: '用户名必须是字符串' })
  @MinLength(3, { message: '用户名长度不能少于3个字符' })
  @MaxLength(50, { message: '用户名长度不能超过50个字符' })
  username!: string;

  @IsNotEmpty({ message: '邮箱不能为空' })
  @IsString({ message: '邮箱必须是字符串' })
  @IsEmail({}, { message: '请输入有效的邮箱地址' })
  @MaxLength(100, { message: '邮箱长度不能超过100个字符' })
  email?: string;

  @IsString({ message: '密码必须是字符串' })
  @MinLength(6, { message: '密码长度不能少于6个字符' })
  @MaxLength(100, { message: '密码长度不能超过100个字符' })
  password?: string;

  @IsNotEmpty({ message: '角色不能为空' })
  @IsEnum(UserRole, { message: '角色必须是有效的角色类型' })
  role!: UserRole;

  @IsString({ message: '昵称必须是字符串' })
  @MaxLength(50, { message: '昵称长度不能超过50个字符' })
  nickname?: string;

  @IsString({ message: '头像必须是字符串' })
  @MaxLength(255, { message: '头像URL长度不能超过255个字符' })
  avatar?: string;
}
