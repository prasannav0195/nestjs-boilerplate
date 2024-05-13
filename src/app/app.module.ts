import { Module } from '@nestjs/common';

import HealthModule from '@app/health/health.module';
import IAMModule from '@app/iam/iam.module';
import UsersModule from '@app/users/users.module';
import LoggerModule from '@common/logger/logger.module';
import { CachingModule, ConfigModule, SequelizeModule } from '@common/modules';

import AppController from './app.controller';
import AppService from './app.service';

@Module({
    imports: [
        LoggerModule,
        ConfigModule,
        SequelizeModule,
        CachingModule,
        HealthModule,
        UsersModule,
        IAMModule
    ],
    controllers: [ AppController ],
    providers: [ AppService ]
})
export default class AppModule {}
