import https from 'https';

import { Logger } from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';
import { id } from 'cls-rtracer';
import { TLDs } from 'global-tld-list';
import jwt, { SignOptions } from 'jsonwebtoken';
import randomString from 'randomstring';

import configuaration from '@common/config';
import { Environments, TokenType } from '@common/constants';
import { AppError } from '@common/errors';
import { GenericObject, RequestPayload } from '@common/types';

const config = configuaration();

export const getBasicAuthorisationToken = (userName: string, password: string): string => {
    const str = `${userName}:${password}`;
    const buff = Buffer.from(str, 'utf-8');
    const base64Code = buff.toString('base64');

    return `${TokenType.BASIC} ${base64Code}`;
};

export function getAuthorizationToken(authorizationToken: string, authType = TokenType.BEARER): string | null {
    if (!authorizationToken)
        return null;

    const [ tokenType, token ] = authorizationToken.split(' ');

    if (tokenType !== authType || !token)
        return null;

    return token;
}

export function generateJWTToken(data: string | Buffer | object, options?: SignOptions, secretKey = config.auth.JWT_SECRET): string {
    return jwt.sign(data, secretKey, options || {});
}

// eslint-disable-next-line consistent-return
function skipSslValidation(): InstanceType<any> | undefined {
    if (([ Environments.DEVELOPMENT ] as string[]).includes(config.ENV))
        return new https.Agent({ rejectUnauthorized: false });
}

function getDynamicAxiosOptions(): AxiosRequestConfig {
    const dynamicConfig: AxiosRequestConfig = {};

    dynamicConfig.httpsAgent = skipSslValidation();

    return dynamicConfig;
}

export const makeExternalRequest = async (requestPayload: RequestPayload): Promise<GenericObject> => {
    const {
        data,
        method,
        ...payload
    } = requestPayload;

    Logger.log('External call requested with the requestPayload =>', requestPayload);

    try {
        const requestConfig: AxiosRequestConfig = {
            ...payload,
            method,
            data,
            ...getDynamicAxiosOptions()
        };

        Logger.log('External call initiated with the requestPayload =>', requestConfig);

        const result = await axios.request(requestConfig);

        Logger.log(`External call for ${requestConfig.method?.toUpperCase()}:${requestConfig.url} finished with the response =>`,
            {
                data: result.data,
                statusCode: result.status,
                status: result.statusText
            });

        // TO_DO Auth error check and retry needs to be added

        return result.data;
    } catch (error: any) {
        Logger.error(new AppError(`Error while making external call: ${error.response.status} error`,
            {
                extras: {
                    requestPayload: {
                        ...requestPayload,
                        data: requestPayload.data
                    },
                    error,
                    response: error.response.data
                }
            }));

        throw error.response.data || error.message || error;
    }
};

export const generateTraceId = (): string => id() as string;

export function generateRandomString(capitalization?: 'lowercase' | 'uppercase', charset = 'alphabetic', length = 6): string {
    return randomString.generate({
        length,
        charset,
        capitalization
    });
}

export const isValidJsonString = (str: string): boolean => {
    try {
        JSON.parse(str);
    } catch (err) {
        return false;
    }

    return true;
};

export const isValidEmailString = (value: string): boolean => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    value
);

export const isValidEmail = (value: string): boolean => {
    const isValidFormat = isValidEmailString(value);

    if (!isValidFormat)
        return false;

    const emailParts = value.split('.');

    const isValid = TLDs.isValid(emailParts[emailParts.length - 1]);

    return isValid;
};

export function convertListToMap(list: GenericObject[], key: string): GenericObject {
    return list.reduce((obj: GenericObject, curr: GenericObject) => {
        if (curr[key] && [ 'string', 'number' ].includes(typeof curr[key]))
        // eslint-disable-next-line no-param-reassign
            obj[curr[key]] = curr;

        return obj;
    }, {});
}

export const capitalizeFirstLetter = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);
