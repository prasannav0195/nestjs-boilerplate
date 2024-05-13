import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

import swagger from '@common/loaders/swagger';

export default (app: NestExpressApplication) : void => {
    app.enableVersioning({ type: VersioningType.URI }); // Needs to be before swagger to include the versioning in API doc
    swagger(app);
    app.useGlobalPipes(new ValidationPipe());
};
