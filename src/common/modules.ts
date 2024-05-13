import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule as configModule, ConfigService } from '@nestjs/config';
import { SequelizeModule as sequelizeModule } from '@nestjs/sequelize';
import * as redisStore from 'cache-manager-redis-store';
import { RedisClientOptions } from 'redis';

import configs from '@common/config';

import models from './models';

export const SequelizeModule = sequelizeModule.forRootAsync({
    inject: [ ConfigService ],
    useFactory: (config: ConfigService) => ({
        dialect: 'mysql',
        host: config.get('db.auth.DB_HOST'),
        port: config.get('db.auth.DB_PORT'),
        database: config.get('db.auth.DB_NAME'),
        username: config.get('db.auth.DB_USER_NAME'),
        password: config.get('db.auth.DB_PASSWORD'),
        models,
        ...(config.get('db.options.pool.POOL_ENABLED') === 'true' && {
            pool: {
                min: 0,
                max: Number(config.get('db.options.pool.DB_MAX_POOL')),
                acquire: 60000,
                idle: Number(config.get('db.options.pool.POOL_IDLE_TIME'))
            }
        })
    })
});

export const ConfigModule = configModule.forRoot({
    isGlobal: true,
    load: [ configs ]
});

export const CachingModule = CacheModule.registerAsync<RedisClientOptions>({
    isGlobal: true,
    imports: [ ConfigModule ],
    inject: [ ConfigService ],
    useFactory: async (config: ConfigService) => ({
        store: redisStore,
        host: config.get('cache.redis.HOST'),
        port: config.get('cache.redis.PORT')
    })
});
