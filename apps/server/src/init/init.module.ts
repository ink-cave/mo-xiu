import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { AuthModule } from '../auth/auth.module';
import { SystemModule } from '../system/system.module';
import { InitService } from './init.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule, SystemModule],
  providers: [InitService],
  exports: [InitService],
})
export class InitModule {}
