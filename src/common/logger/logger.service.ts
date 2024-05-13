import { Injectable, LoggerService as ILoggerService } from '@nestjs/common';

import { GenericObject } from '../types';

import Logger from './winston/winston.config';

@Injectable()
export default class LoggerService implements ILoggerService {
    log(message: string, ...optionalParams: GenericObject[]): void {
        Logger.info(message, { ...optionalParams });
    }

    error(message: string, ...optionalParams: GenericObject[]): void {
        Logger.error(message, { ...optionalParams });
    }

    warn(message: string, ...optionalParams: GenericObject[]): void {
        Logger.warn(message, { ...optionalParams });
    }

    debug?(message: string, ...optionalParams: GenericObject[]): void {
        Logger.debug(message, { ...optionalParams });
    }
}
