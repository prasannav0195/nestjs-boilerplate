import {
    Body, Controller, Get, Post, UseGuards
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

// import { JwtGuard } from '@common/guards';

import { JwtGuard } from '@app/common/guards';

import { IUser } from './types';
import UsersService from './users.service';
import UserDto from './validations';

@ApiTags('Users')
@Controller({ path: '/users', version: '1' })
export default class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    @UseGuards(JwtGuard)
    async getAllUsers(): Promise<any> {
        return this.usersService.getAllUsers();
    }

    @Post()
    @UseGuards(JwtGuard)
    createUser(@Body() userDto: UserDto): Promise<IUser> {
        return this.usersService.createUser(userDto);
    }
}
