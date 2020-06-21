import winston from "winston";

const requestTransport = [
    new winston.transports.File({
        filename: 'logs/express-request.log',
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


function createRequestLogger(transports) {
    const requestLogger = winston.createLogger({
        format: getRequestLogFormatter(),
        transports: transports
    })

    return function logRequest(req, res, next) {
        if (process.env.LOG_EXPRESS_REQUEST == "ON") {
            let info = {};
            info.ip = fillSpace(sanatizeIp(req.headers['x-forwarded-for'] || req.connection.remoteAddress), 15);
            info.method = fillSpace(req.method, 7)
            info.user = fillSpace(req.user ? req.user.username ? req.user.username : 'anonymous' : 'anonymous', 15)
            info.dst = req.hostname + (req.port || '') + (req.originalUrl || '')
            info.operation = fillSpace(req.body ? req.body.operationName ? req.body.operationName : "-" : "-", 15)
            requestLogger.info(info)
        }
        next()
    }
}

function fillSpace(str, length) {
    let diff = length - str.length
    for (let i = 0; i < diff; i++) {
        str += " "
    }
    return str
}

function sanatizeIp(ip) {
    return ip.replace("::ffff:", "")
}

function getRequestLogFormatter() {
    const {combine, timestamp, printf} = winston.format;


    return combine(
        timestamp(),
        printf(info => {
            const {ip, method, user, dst, operation} = info.message;
            return `${info.timestamp} ${info.level} REQUEST ${method} IP:${ip} USER:${user} OP:${operation} DST:${dst} `;
        }),
    );
}


export const expressRequestLogger = createRequestLogger(requestTransport);