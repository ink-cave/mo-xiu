import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { yamlConfigLoader } from '../../config/yaml-loader';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [yamlConfigLoader],
      validationSchema: Joi.object({
        app: Joi.object({
          port: Joi.number().required().default(3000),
        }),
        database: Joi.object({
          type: Joi.string().required(),
          host: Joi.string().required(),
          port: Joi.number().required(),
          username: Joi.string().required(),
          password: Joi.string().required(),
          database: Joi.string().required(),
          synchronize: Joi.boolean().required(),
          logging: Joi.alternatives()
            .try(Joi.boolean(), Joi.string())
            .required(),
          keepConnectionAlive: Joi.boolean().optional(),
          retryAttempts: Joi.number().optional(),
          retryDelay: Joi.number().optional(),
        }),
      }),
    }),
  ],
})
export class ConfigModule {}
