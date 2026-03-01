import {
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import type { CreateUserDto } from './dto/create-user.dto';
import type { LoginUserDto } from './dto/login-user.dto';
import type { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User, UserRole } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // 检查用户名是否已存在
    const existingUserByUsername = await this.usersRepository.findOne({
      where: { username: createUserDto.username },
    });
    if (existingUserByUsername) {
      throw new ConflictException('用户名已存在');
    }

    // 检查邮箱是否已存在
    const existingUserByEmail = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (existingUserByEmail) {
      throw new ConflictException('邮箱已被注册');
    }

    // 检查是否要创建超级管理员
    if (createUserDto.role === UserRole.SUPER_ADMIN) {
      // 检查是否已存在超级管理员
      const existingSuperAdmin = await this.usersRepository.findOne({
        where: { role: UserRole.SUPER_ADMIN },
      });
      if (existingSuperAdmin) {
        throw new ConflictException('超级管理员只能有一个');
      }
    }

    // 如果没有提供密码，默认使用123456
    const passwordToHash = createUserDto.password || '123456';
    // 加密密码
    const hashedPassword = await bcrypt.hash(passwordToHash, 10);

    // 创建新用户
    const newUser = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return this.usersRepository.save(newUser);
  }

  async login(
    loginUserDto: LoginUserDto,
  ): Promise<{ user: User; token: string }> {
    const { username, password: _password } = loginUserDto;

    // 查找用户（通过用户名或邮箱）
    const user = await this.usersRepository.findOne({
      where: [{ username }, { email: username }],
    });

    if (!user) {
      throw new UnauthorizedException('该账号不存在');
    }

    // 验证密码
    const isPasswordValid = await bcrypt.compare(_password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('用户名/邮箱或密码错误');
    }

    // 生成 JWT token
    const payload = { sub: user.id, username: user.username };
    const token = this.jwtService.sign(payload, {
      expiresIn: this.configService.get('jwt.expiresIn'),
    });

    return { user, token };
  }

  async findAll(currentUser: User): Promise<User[]> {
    let users = await this.usersRepository.find();

    // 如果当前用户不是admin，过滤掉admin账户
    if (currentUser.role !== UserRole.ADMIN) {
      users = users.filter((user) => user.role !== UserRole.ADMIN);
    }

    return users;
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
    currentUser: User,
  ): Promise<User> {
    // 权限检查：只有管理员可以修改用户
    if (
      currentUser.role !== UserRole.ADMIN &&
      currentUser.role !== UserRole.SUPER_ADMIN
    ) {
      throw new ForbiddenException('只有管理员可以修改用户');
    }

    // 获取目标用户
    const targetUser = await this.usersRepository.findOne({ where: { id } });
    if (!targetUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // 检查是否要修改角色
    if (updateUserDto.role) {
      // 如果目标用户是超级管理员，不能修改其角色
      if (targetUser.role === UserRole.SUPER_ADMIN) {
        throw new ForbiddenException('不能修改超级管理员的角色');
      }

      // 不能将普通用户修改为超级管理员
      if (updateUserDto.role === UserRole.SUPER_ADMIN) {
        // 检查是否已存在超级管理员
        const existingSuperAdmin = await this.usersRepository.findOne({
          where: { role: UserRole.SUPER_ADMIN },
        });
        if (existingSuperAdmin) {
          throw new ConflictException('超级管理员只能有一个');
        }
      }
    }

    // 删除密码字段，确保不能通过更新接口修改密码
    delete updateUserDto.password;

    await this.usersRepository.update(id, updateUserDto);
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async remove(id: number, currentUser: User): Promise<void> {
    // 权限检查：只有管理员可以删除用户
    if (
      currentUser.role !== UserRole.ADMIN &&
      currentUser.role !== UserRole.SUPER_ADMIN
    ) {
      throw new ForbiddenException('只有管理员可以删除用户');
    }

    // 获取目标用户
    const targetUser = await this.usersRepository.findOne({ where: { id } });
    if (!targetUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // 不能删除超级管理员
    if (targetUser.role === UserRole.SUPER_ADMIN) {
      throw new ForbiddenException('不能删除超级管理员');
    }

    await this.usersRepository.delete(id);
  }

  async changePassword(
    userId: number,
    oldPassword: string,
    newPassword: string,
  ): Promise<{ message: string }> {
    // 查找用户
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('用户不存在');
    }

    // 验证旧密码
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('原密码错误');
    }

    // 加密新密码
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 更新密码
    await this.usersRepository.update(userId, { password: hashedPassword });

    return { message: '密码修改成功' };
  }
}
