import { Module } from '@nestjs/common';

import { PrismaModule } from '@app/common/prisma/prisma.module';

import IoService from './io.service';

@Module({
    providers: [ IoService ],
    exports: [ IoService ],
    imports: [ PrismaModule ]
})
export default class IoModule {}
