import winston from "winston";

const generalTransports = [
    new winston.transports.File({
        filename: 'logs/combined.log',
        level: 'info'
    }),
    new winston.transports.File({
        filename: 'logs/errors.log',
        level: 'error',
        handleExceptions: true
    }),
    new winston.transports.Console({
        handleExceptions: true
    })
]


function createGeneralLogger(transports) {
    const generalLogger = winston.createLogger({
        format: getGeneralLogFormatter(),
        transports: transports
    })

    return generalLogger
}

function getGeneralLogFormatter() {
    const {combine, timestamp, printf} = winston.format;

    return combine(
        timestamp(),
        printf(info => `${info.timestamp} ${info.level} ${info.message} `)
    );
}


export const generalLogger =  createGeneralLogger(generalTransports);