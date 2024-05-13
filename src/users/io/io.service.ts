import { Inject, Injectable } from '@nestjs/common';

import { IUser } from '../types';

import User from './models/user.entity';

@Injectable()
export default class IoService {
    constructor(
        @Inject('UserRepository')
        private userRepository: typeof User
    ) {}

    async getAllUsers(): Promise<IUser[]> {
        return this.userRepository.findAll();
    }
}
