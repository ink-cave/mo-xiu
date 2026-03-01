import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SystemConfig } from './entities/system-config.entity';

@Injectable()
export class SystemService {
  constructor(
    @InjectRepository(SystemConfig)
    private systemConfigRepository: Repository<SystemConfig>,
  ) {}

  // 获取系统配置
  async getSystemConfig(): Promise<SystemConfig> {
    // 查找系统配置，如果不存在则创建默认配置
    let config = await this.systemConfigRepository.findOne({
      where: { id: 1 },
    });
    if (!config) {
      config = this.systemConfigRepository.create({
        systemName: '后台管理系统',
        captchaEnabled: true,
        sessionTimeout: 24,
      });
      config = await this.systemConfigRepository.save(config);
    }
    return config;
  }

  // 更新系统配置
  async updateSystemConfig(
    config: Partial<SystemConfig>,
  ): Promise<SystemConfig> {
    // 查找系统配置
    let existingConfig = await this.systemConfigRepository.findOne({
      where: { id: 1 },
    });
    if (!existingConfig) {
      // 如果不存在，创建新配置
      existingConfig = this.systemConfigRepository.create(config);
    } else {
      // 如果存在，更新配置
      Object.assign(existingConfig, config);
    }
    return this.systemConfigRepository.save(existingConfig);
  }

  // 初始化默认系统配置
  async initializeDefaultConfig(): Promise<void> {
    const config = await this.systemConfigRepository.findOne({
      where: { id: 1 },
    });
    if (!config) {
      const defaultConfig = this.systemConfigRepository.create({
        systemName: '后台管理系统',
        captchaEnabled: true,
        sessionTimeout: 24,
      });
      await this.systemConfigRepository.save(defaultConfig);
    }
  }
}
