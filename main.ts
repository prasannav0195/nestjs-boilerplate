import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import AppModule from '@app/app/app.module';
import LoggerService from '@app/common/logger/logger.service';
import loaders from '@common/loaders';

async function startServer(): Promise<void> {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const configService = app.get(ConfigService);
    const loggerService = app.get(LoggerService);

    const port = configService.get('PORT');

    loaders(app);

    await app.listen(port);
    loggerService.log(`Server started at ${port} with config: ${JSON.stringify(configService)}`);
}

startServer();
