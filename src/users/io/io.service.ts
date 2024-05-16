import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

import { PrismaService } from '@app/common/prisma/prisma.service';

@Injectable()
export default class IoService {
    constructor(
        private prisma: PrismaService
    ) {}

    async getAllUsers(): Promise<User[]> {
        try {
            const users = this.prisma.user.findMany();

            return users;
        } catch (err) {
            console.log(err);

            return [];
        }
    }

    async createUser(data: Prisma.UserCreateInput): Promise<User> {
        return this.prisma.user.create({ data });
    }
}
