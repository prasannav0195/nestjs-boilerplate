import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import IAMController from './iam.controller';
import IAMService from './iam.service';

@Module({
    imports: [ ConfigModule ],
    controllers: [ IAMController ],
    providers: [ IAMService ]
})
export default class IAMModule {}
