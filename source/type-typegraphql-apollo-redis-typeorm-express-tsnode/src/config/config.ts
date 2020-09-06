require('dotenv').config();

export const config = {
    loggingLevel: process.env.loggingLevel,
    logging: {
        info: process.env['logging.info'],
        error: process.env['logging.error'],
        debug: process.env['logging.debug'],
        silly: process.env['logging.silly']
    }
}