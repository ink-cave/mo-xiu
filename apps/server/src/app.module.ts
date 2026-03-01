import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from './config/config.module';
import { ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './user/user.module';
import { ProjectModule } from './project/project.module';
import { AuthModule } from './auth/auth.module';
import { MenuModule } from './menu/menu.module';
import { SystemModule } from './system/system.module';
import { InitModule } from './init/init.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: configService.get('database.type') as 'postgres',
        host: configService.get('database.host')!,
        port: configService.get('database.port')!,
        username: configService.get('database.username')!,
        password: configService.get('database.password')!,
        database: configService.get('database.database') as string,
        entities: [`${__dirname}/**/*.entity{.ts,.js}`],
        synchronize: configService.get('database.synchronize')!,
        logging: configService.get('database.logging'),
        keepConnectionAlive: configService.get('database.keepConnectionAlive'),
        retryAttempts: configService.get('database.retryAttempts'),
        retryDelay: configService.get('database.retryDelay'),
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    ProjectModule,
    MenuModule,
    SystemModule,
    InitModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
