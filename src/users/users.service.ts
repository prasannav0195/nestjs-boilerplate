import { Injectable } from '@nestjs/common';

import IoService from './io/io.service';
import { IUser } from './types';

@Injectable()
export default class UsersService {
    constructor(private ioService: IoService) {}

    async getAllUsers(): Promise<IUser[]> {
        return this.ioService.getAllUsers();
    }
}
