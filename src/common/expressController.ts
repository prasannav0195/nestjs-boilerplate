import { HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { ReasonPhrases } from 'http-status-codes';

import { AppError } from '@common/errors';

import { GenericObject } from './types';

export default abstract class ExpressController {
    public invalid(res: Response, errors: any): Response {
        const data = {
            errors,
            success: false
        };

        res.respData = data;

        return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json(data);
    }

    public conflict(res: Response, message: string): Response {
        const data = {
            message,
            success: false
        };

        res.respData = data;

        return res.status(HttpStatus.CONFLICT).json(data);
    }

    public json(
        data: GenericObject,
        ctx: { req: Request; res: Response },
        addons: GenericObject = {}
    ): void {
        const { res } = ctx;

        Logger.log(`Responded with data of ${JSON.stringify(data || {})}`);

        res.respData = data;

        res.status(HttpStatus.OK).json({
            success: true,
            code: 0,
            error: '',
            data,
            ...addons
        });
    }

    public internalServerError(res: Response): Response {
        const data = {
            success: false,
            error: 'Something went wrong!',
            message: 'Something went wrong!',
            code: -1
        };

        res.respData = data;

        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(data);
    }

    public catch = async (error: any, ctx: { req: Request; res: Response }): Promise<void> => {
        const { res } = ctx;
        const errorData = { ...error };

        errorData.rootCause = {
            ...error.rootCause
        };

        switch (errorData.response?.status || errorData.response?.statusText || errorData.name) {
            case ReasonPhrases.CONFLICT:
            case HttpStatus.CONFLICT:
                this.conflict(res, error.message);
                break;

            case ReasonPhrases.NOT_FOUND:
            case HttpStatus.NOT_FOUND:
                res.status(HttpStatus.OK).json({
                    success: false,
                    message: error.message
                });
                break;

            case ReasonPhrases.UNPROCESSABLE_ENTITY:
            case HttpStatus.UNPROCESSABLE_ENTITY:
                res.status(HttpStatus.OK).json({
                    success: false,
                    message: error.message
                });
                break;

            case 'BadRequestErrorWithCode':
                res.status(HttpStatus.OK).json({
                    success: false,
                    message: error.message
                });
                break;

            case ReasonPhrases.BAD_REQUEST:
            case HttpStatus.BAD_REQUEST:
                res.status(HttpStatus.OK).json({
                    success: false,
                    message: error.message,
                    rootCause: error.rootCause
                });
                break;

            case ReasonPhrases.UNAUTHORIZED:
            case HttpStatus.UNAUTHORIZED:
                res.status(HttpStatus.OK).json({
                    success: false,
                    data: error
                });
                break;

            case ReasonPhrases.SERVICE_UNAVAILABLE:
            case HttpStatus.SERVICE_UNAVAILABLE:
                break;

            default:
                this.internalServerError(res);
                Logger.error(
                    new AppError('Internal server error', { extras: { error } })
                );
        }
    };
}
