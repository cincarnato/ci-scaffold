import winston from "winston";

const graphqlResponseTransport = [
    new winston.transports.File({
        filename: 'logs/graphql-response.log',
        level: 'info'
    }),
    new winston.transports.File({
        filename: 'logs/combined.log',
        level: 'info'
    }),
    new winston.transports.Console({
        handleExceptions: true
    })
]

const unwrap = (s) => s.replace(
    /\n/g, ''
);

function createGraphqResponselLogger(transports) {
    const graphqlResponseLogger = winston.createLogger({
        format: getGraphqlResponseLogFormatter(),
        transports: transports
    })




    return function logResponse(requestContext) {
        if (process.env.LOG_GRAPHQL_RESPONSE == "ON") {
            let info = {};
            info.user = requestContext.context.user ? requestContext.context.user.username ? requestContext.context.user.username: "anonymous" : "anonymous"
            info.type = requestContext.operation ? requestContext.operation.operation ? requestContext.operation.operation.toUpperCase() : "" : ""
            info.operation = requestContext.operationName || ""
            info.query = unwrap(requestContext.request.query) || ""
            info.variables = JSON.stringify(requestContext.request.variables) || ""
            info.resp = JSON.stringify(requestContext.response.data) || ""
            graphqlResponseLogger.info(info)
        }
    }
}

function getGraphqlResponseLogFormatter() {
    const {combine, timestamp, printf} = winston.format;

    return combine(
        timestamp(),
        printf(info => {
            const {user, type, operation, query, variables, resp} = info.message;
            return `${info.timestamp} ${info.level} GQLRESP ${type} OP:${operation} USER:${user} QRY: ${query} VAR: ${variables} RESP: ${resp} \n`
        })
    );
}

export const graphqlResponseLogger =  createGraphqResponselLogger(graphqlResponseTransport);