import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';

import LoggerService from '@app/common/logger/logger.service';

import { HealthCheckResponse } from './health.types';

@Injectable()
export default class HealthService {
    constructor(
    private readonly logger: LoggerService,
    private configService: ConfigService,
    private sequelize: Sequelize,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) {}

    async getDbHealthStatus(): Promise<string> {
        try {
            await this.sequelize.authenticate();

            return 'ok';
        } catch (err) {
            this.logger.error('Unable to connect to the database:', err);

            return 'forbid';
        }
    }

    async getCacheStatus(): Promise<string> {
        try {
            await this.cacheManager.set('testKey', 'testValue');

            const value = await this.cacheManager.get('testKey');

            return value === 'testValue' ? 'ok' : 'forbid';
        } catch (err) {
            this.logger.error('Unable to connect to the redis:', err);

            return 'forbid';
        }
    }

    async getHealth(): Promise<HealthCheckResponse> {
        const port = this.configService.get<string>('PORT');
        const env = this.configService.get<string>('ENV');
        const dbHealth = await this.getDbHealthStatus();
        const cacheHealth = await this.getCacheStatus();

        return {
            message: `Server running on http://localhost:${port} in ${env} environment`,
            appHealth: 'ok',
            dbHealth,
            cacheHealth
        };
    }
}
