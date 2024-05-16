import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit(): Promise<void> {
        try {
            await this.$connect();
            Logger.log('Database connected successfully');
        } catch (err) {
            Logger.error('Error in connecting database', err);
        }
    }
}
