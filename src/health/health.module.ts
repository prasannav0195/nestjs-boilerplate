import { Module } from '@nestjs/common';

import { PrismaModule } from '@app/common/prisma/prisma.module';

import HealthController from './health.controller';
import HealthService from './health.service';

@Module({
    controllers: [ HealthController ],
    providers: [ HealthService ],
    imports: [ PrismaModule ]
})
export default class HealthModule {}
