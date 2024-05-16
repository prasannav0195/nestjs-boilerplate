import { Injectable } from '@nestjs/common';

import IoService from './io/io.service';
import { IUser } from './types';
import UserDto from './validations';

@Injectable()
export default class UsersService {
    constructor(private ioService: IoService) {}

    async getAllUsers(): Promise<IUser[]> {
        return this.ioService.getAllUsers();
    }

    async createUser(userDto: UserDto): Promise<IUser> {
        const user = await this.ioService.createUser(userDto);

        return user;
    }
}
