import { createLogger, format, transports as transport } from 'winston';

import 'winston-daily-rotate-file';
import configuration from '@common/config';
import { generateTraceId } from '@common/util';

const { CONSOLE_LOG_ENABLED, ENV } = configuration();
const logDir = './log';
const transports = [];

const addTraceId = format((info) => {
    const traceId = generateTraceId();
    const infoData = info;

    infoData.message = traceId
        ? `[TraceId: ${traceId}] ${info.message}`
        : info.message;

    return infoData;
});

const consoleTrans = new transport.Console({
    format: format.combine(
        addTraceId(),
        format.errors({ stack: true }),
        format.timestamp(),
        format.colorize(),
        format.simple()
    )
});

const infoLogTrans = new transport.DailyRotateFile({
    level: 'info',
    dirname: logDir,
    createSymlink: true,
    symlinkName: 'info.log',
    format: format.combine(
        addTraceId(),
        format.errors({ stack: true }),
        format.timestamp(),
        format.json()
    )
});

const errorLogTrans = new transport.DailyRotateFile({
    level: 'error',
    dirname: logDir,
    createSymlink: true,
    symlinkName: 'errors.log',
    format: format.combine(
        addTraceId(),
        format.errors({ stack: true }),
        format.timestamp(),
        format.json()
    )
});

if (ENV !== 'test')
    transports.push(...[ infoLogTrans, errorLogTrans ]);

if (CONSOLE_LOG_ENABLED)
    transports.push(consoleTrans);

// Create and export the logger instance
export default createLogger({
    level: 'info',
    format: format.json(),
    transports
});
