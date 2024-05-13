import { Module } from '@nestjs/common';

import IoService from './io.service';
import UserProviders from './models/user.provider';

@Module({
    providers: [ IoService, ...UserProviders ],
    exports: [ IoService ]
})
export default class IoModule {}
