import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule as configModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import { RedisClientOptions } from 'redis';

import configs from '@common/config';

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
