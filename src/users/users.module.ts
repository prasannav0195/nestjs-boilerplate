import { Module } from '@nestjs/common';

import IoModule from './io/io.module';
import UsersController from './users.controller';
import UsersService from './users.service';

@Module({
    imports: [ IoModule ],
    providers: [ UsersService ],
    controllers: [ UsersController ]
})
export default class UsersModule {}
