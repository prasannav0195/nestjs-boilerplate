import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

import { TokenType } from '@common/constants';
import LoggerService from '@common/logger/logger.service';
import { GenericObject } from '@common/types';
import { getAuthorizationToken } from '@common/util';

@Injectable()
export class BasicGuard implements CanActivate {
    constructor(private readonly configService: ConfigService) {}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const authToken = getAuthorizationToken(request.headers.authorization, TokenType.BASIC);

        if (authToken === null)
            return false;

        const decodedCredentials = Buffer.from(authToken, 'base64').toString('utf-8');
        const [ username, password ] = decodedCredentials.split(':');

        const authConfig = this.configService.get<GenericObject>('auth');

        return username === authConfig.ADMIN_USERNAME && password === authConfig.ADMIN_PASSWORD;
    }
}

@Injectable()
export class JwtGuard implements CanActivate {
    constructor(private readonly configService: ConfigService, private readonly loggerService: LoggerService) {}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();

        const authToken = getAuthorizationToken(request.headers.authorization);

        if (authToken === null)
            return false;

        try {
            const authConfig = this.configService.get<GenericObject>('auth');

            request.user = jwt.verify(authToken, authConfig.JWT_SECRET);

            return true;
        } catch (error: any) {
            this.loggerService.error('Error whiled decoding JWT token', error);

            return false;
        }
    }
}
