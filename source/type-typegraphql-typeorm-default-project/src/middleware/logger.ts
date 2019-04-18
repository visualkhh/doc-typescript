import {Logger, LoggerOptions, transports, default as winston} from "winston";
import {config} from "../config/config";
import moment = require("moment");
require("winston-daily-rotate-file");


// We might want to do something on rotation?
// rotateTransport.on("rotate", (oldFilename, newFilename) => {
//     // do something fun
// });

const options: LoggerOptions = {
    exitOnError: false,
    level: config.loggingLevel||'debug',
    transports: [
        new (require('winston-daily-rotate-file'))({
            name: "info",
            filename: config.logging.info,
            datePattern: "YYYY-MM-DD",
            zippedArchive: true,
            maxSize: "20m",
            maxFiles: "14d",
            showLevel: true,
            timestamp: true,
            level: "info", // info and below to rotate
            format: winston.format.printf(info => `${moment().format('YYYY-MM-DD HH:mm:ss')} [${info.level.toUpperCase()}] - ${info.message}`)
        }),
        new (require('winston-daily-rotate-file'))({
            name: "error",
            filename: config.logging.error,
            datePattern: "YYYY-MM-DD",
            zippedArchive: true,
            maxSize: "20m",
            maxFiles: "14d",
            showLevel: true,
            timestamp: true,
            level: "error", // error and below to rotate
            format: winston.format.printf(info => `${moment().format('YYYY-MM-DD HH:mm:ss')} [${info.level.toUpperCase()}] - ${info.message}`)
        }),
        new (require('winston-daily-rotate-file'))({
            name: "debug",
            filename: config.logging.debug,
            datePattern: "YYYY-MM-DD",
            zippedArchive: true,
            maxSize: "20m",
            maxFiles: "14d",
            showLevel: true,
            timestamp: true,
            level: "debug", // error and below to rotate
            format: winston.format.printf(info => `${moment().format('YYYY-MM-DD HH:mm:ss')} [${info.level.toUpperCase()}] - ${info.message}`)
        }),
        new (require('winston-daily-rotate-file'))({
            name: "error",
            filename: config.logging.silly,
            datePattern: "YYYY-MM-DD",
            zippedArchive: true,
            maxSize: "20m",
            maxFiles: "1d",
            showLevel: true,
            timestamp: true,
            level: "silly", // error and below to rotate
            format: winston.format.printf(info => `${moment().format('YYYY-MM-DD HH:mm:ss')} [${info.level.toUpperCase()}] - ${info.message}`)
        }),

    ],
};

const logger = winston.createLogger(options);

if (process.env.NODE_ENV !== 'prod') {
    logger.add(new winston.transports.Console({
        format: winston.format.printf(info => `${moment().format('YYYY-MM-DD HH:mm:ss')} [${info.level.toUpperCase()}] - ${info.message}`)
        // format: winston.format.simple()
    }));
}

export { logger };