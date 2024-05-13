import { NestExpressApplication } from '@nestjs/platform-express';
import {
    DocumentBuilder,
    SwaggerDocumentOptions,
    SwaggerModule
} from '@nestjs/swagger';

import config from '@common/config';
import { Environments } from '@common/constants';
import { name, description, version } from 'package.json';

const { ENV } = config();

export default (app: NestExpressApplication) : void => {
    if (ENV === Environments.PRODUCTION)
        return;

    const swaggerConfig = new DocumentBuilder()
        .setTitle(name)
        .setDescription(description)
        .setVersion(version)
        .build();

    const options: SwaggerDocumentOptions = {
        operationIdFactory: (methodKey: string) => methodKey
    };

    const document = SwaggerModule.createDocument(app, swaggerConfig, options);

    SwaggerModule.setup('docs', app, document);
};
