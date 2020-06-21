require('dotenv').config();
import winston from "winston";


const graphqlErrorTransports = [
    new winston.transports.File({
        filename: 'logs/graphql-error.log',
        level: 'error',
        handleExceptions: true
    }),
    new winston.transports.File({
        filename: 'logs/combined.log',
        level: 'error'
    }),
    new winston.transports.Console({
        handleExceptions: true
    })
]


function createGraphqlErrorLogger(transports) {
    const graphqlErrorLogger = winston.createLogger({
        level: 'error',
        format: getGraphqlErrorLogFormatter(),
        transports: transports
    })

    return function logError(requestContext) {
        if (process.env.LOG_GRAPHQL_ERRORS == "ON") {
            let info = {};
            info.user = requestContext.context.user ? requestContext.context.user.username ? requestContext.context.user.username : "anonymous" : "anonymous"
            info.operation = requestContext.operationName || ""
            requestContext.errors.forEach(error => {
                console.log(error)
                info.msg = error.message || ""
                info.code = error.extensions ? error.extensions.code ? error.extensions.code : "" : ""
                graphqlErrorLogger.error(info)
            })
        }
    }

}

function getGraphqlErrorLogFormatter() {
    const {combine, timestamp, printf} = winston.format;

    return combine(
        timestamp(),
        printf(info => {
            const {user, operation, code, msg} = info.message;
            return `${info.timestamp} ${info.level} GQLERROR USER:${user} OP:${operation} CODE: ${code}  MSG: ${msg} `
        })
    );
}

export const graphqlErrorLogger = createGraphqlErrorLogger(graphqlErrorTransports);