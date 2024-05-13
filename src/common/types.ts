import { Method } from 'axios';

export type GenericObject = { [key: string]: any };

// Extend express types
declare module 'express' {
    interface Request {
            user?: GenericObject;
            userData?: GenericObject;
            language?: string;
    }
    interface Response {
        respData?: GenericObject;
        sendResponse?: GenericObject;
    }
}

export type SuccessResponse = {
    success: boolean;
    error: string | null;
};

export type InternalServerError = {
    success: boolean;
    error: string | null;
    message: string;
};

export type FieldValidationResponse = { isValid: boolean; message?: string };

export interface RequestPayload {
    method: Method;
    url: string;
    serviceName?: string;
    headers?: { [key: string]: any };
    data?: GenericObject;
    params?: GenericObject;
    retryCount?: number;
}

export type UserInfo<T> = T & { userId: string };

export type AppErrorOptions = {
    extras?: Record<string, GenericObject>;
    tags?: Record<string, GenericObject>;
};
