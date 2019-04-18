import {Logger, QueryRunner} from "typeorm";
import {logger} from "./logger";

export class TypeOrmCustomLogger implements Logger {
    log(level: "log" | "info" | "warn", message: any, queryRunner?: QueryRunner): any {
        logger.debug('log', level, message, queryRunner);
    }

    logMigration(message: string, queryRunner?: QueryRunner): any {
        logger.debug('logMigration', message, queryRunner);
    }

    logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner): any {
        logger.debug('query:' + query + '-- PARAMETERS: ' + parameters);
    }

    logQueryError(error: string, query: string, parameters?: any[], queryRunner?: QueryRunner): any {
        logger.debug('logQueryError', error, query, parameters, queryRunner);
    }

    logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner): any {
        logger.debug('logQuerySlow', time, query, parameters, queryRunner);
    }

    logSchemaBuild(message: string, queryRunner?: QueryRunner): any {
        logger.debug('logSchemaBuild', message, queryRunner);
    }


}