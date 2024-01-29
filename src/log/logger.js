import winston from "winston";
import path from 'node:path'

const logFilePath = path.join(process.cwd(), 'src/log/.log')
const { combine, timestamp, align, printf, cli } = winston.format

const loggerFormat = combine(
    cli(),
    timestamp({
        format: 'YYYY-MM-DD hh:mm:ss'
    }),
    align(),
    printf((info) => `[${info.timestamp}] - ${info.level}: ${info.message}`)
)

const logger = winston.createLogger({
    level: 'info',
    format: loggerFormat,
    transports: [new winston.transports.File({
        filename: logFilePath
    })]
})

export default logger