/* eslint-disable node/no-extraneous-require */
/* eslint-disable @typescript-eslint/no-var-requires */
import { Environments } from '../constants';
import { GenericObject } from '../types';

require('dotenv').config();

export default (): GenericObject => ({
    ENV: process.env.ENVIRONMENT || Environments.DEVELOPMENT,
    PORT: process.env.PORT || 8080,
    db: {
        auth: {
            DB_HOST: process.env.DB_HOST,
            DB_USER_NAME: process.env.DB_USER_NAME,
            DB_PASSWORD: process.env.DB_PASSWORD,
            DB_NAME: process.env.DB_NAME,
            DB_PORT: process.env.DB_PORT
        },
        options: {
            pool: {
                DB_MAX_POOL: process.env.DB_MAX_POOL || 250,
                POOL_IDLE_TIME: process.env.POOL_IDLE_TIME || 5000,
                POOL_ENABLED: process.env.POOL_ENABLED || true
            }
        }
    },
    CONSOLE_LOG_ENABLED: true,
    REQUEST_KEYS_TO_LOG: process.env.REQUEST_KEYS_TO_LOG || [
        'method',
        'originalUrl',
        'params',
        'httpVersion',
        'headers',
        'url',
        'statusCode',
        'hostname',
        'baseUrl',
        'query',
        'body'
    ],
    sentry: {
        dsn: 'https://442ffb3567a3e1588eca855e09cb6f5f@sentry-beta.corp.algento.com/5'
    },
    cache: {
        redis: {
            PORT: '6379',
            HOST: 'localhost',
            AUTH: ''
        }
    },
    auth: {
        JWT_SECRET: 'boilerplate_beta_secret',
        ADMIN_USERNAME: 'astraadmin',
        ADMIN_PASSWORD: '64cfebcfd9864da38a91d9556360a178'
    },
    externalServices: {
        OPEN_PLATFORM: {
            AUTH_CLIENT_ID: 'botBsPJK9KxydqHfJ',
            AUTH_CLIENT_SECRET: '64cfebcfd9864da38a91d9556360a178',
            OPEN_API_URL: 'https://betaproxy-hk.botim.me:7443/openapiProxy/api',
            OPEN_AUTH_URL: 'https://betaproxy-hk.botim.me:7443/openapiProxy/api',
            STORE_URL: 'https://betaproxy-hk.botim.me:7443/storersbjsproxy/api',
            STORE_VERIFY_TOKEN: 'YuefOSEp9Jbr5Taa285RxuZz07BmNRHvhsN9ep6j5U9'
        }
    }
});
