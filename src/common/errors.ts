import { Logger } from '@nestjs/common';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';

import { AppErrorOptions, GenericObject } from '@common/types';

class BaseError extends Error {
    public rootCause: Error | null;
    public internalCode: number | undefined;

    constructor(name: string, message: string, rootCause: Error | null, ...params: any) {
        super(...params);

        if (Error.captureStackTrace)
            Error.captureStackTrace(this, BaseError);

        this.name = name;
        this.message = message;
        this.rootCause = rootCause;
    }
}

export class AppError extends Error {
    options?: AppErrorOptions;

    constructor(message?: string, options?: AppErrorOptions) {
        super(message);

        this.options = options;
    }
}

export class AlreadyExistsError extends BaseError {
    constructor(message: string, rootCause: Error | null = null, ...params: any) {
        super(getReasonPhrase(StatusCodes.CONFLICT), message, rootCause, ...params);
    }
}

export class UserInputValidationError extends BaseError {
    public errors: {
        path?: string;
        message: string;
        value: any;
    }[];

    constructor(errors: { path?: string; message: string; value: any; }[], ...params: any) {
        super(
            getReasonPhrase(StatusCodes.UNPROCESSABLE_ENTITY),
            `Invalid Data! Please check your request: ${JSON.stringify(errors[0])}`,
            (errors?.[0]?.message as any) || null,
            ...params
        );

        this.errors = errors;

        Logger.error(new AppError('Validation Error', { extras: { errors } }));
    }
}

export class NotFoundError extends BaseError {
    constructor(message: string, internalCode?: string, ...params: any) {
        super(getReasonPhrase(StatusCodes.NOT_FOUND), message, null, {
            internalCode,
            ...params
        });
    }
}

export class BadRequestError extends BaseError {
    constructor(message: string, internalCode?: string, ...params: any) {
        super(getReasonPhrase(StatusCodes.BAD_REQUEST), message, null, {
            internalCode,
            ...params
        });
    }
}

export class UnauthorizedError extends BaseError {
    constructor(message: string, ...params: any) {
        super(getReasonPhrase(StatusCodes.UNAUTHORIZED), message, null, ...params);
    }
}

export class UnCaughtError extends BaseError {
    constructor(message: string | null, rootCause: Error, ...params: any) {
        super(
            getReasonPhrase(StatusCodes.SERVICE_UNAVAILABLE),
            message || '',
            rootCause,
            ...params
        );
    }
}

export class ExternalDependencyError extends BaseError {
    constructor(message: string, internalCode?: string, ...params: any) {
        super('ExternalDependencyError', message, null, {
            internalCode,
            ...params
        });
    }
}

export class ErrorWithPrompt extends BaseError {
    errorCode: number;
    data: GenericObject;

    constructor(message: string, errorCode: number, data: GenericObject = {}, ...params: any) {
        super(getReasonPhrase(StatusCodes.BAD_REQUEST), message, null, params);

        this.errorCode = errorCode;
        this.data = data;
    }
}
