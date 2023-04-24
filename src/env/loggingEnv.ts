import { PinoLoggerOptions } from 'fastify/types/logger'

interface LoggingEnv {
  development: PinoLoggerOptions
  production: true
  test: false
}

export const loggingConfig: LoggingEnv = {
  development: {
    level: 'debug', // "fatal" | "error" | "warn" | "info" | "debug" | "trace"
    transport: {
      target: 'pino-pretty',
      options: {
        // colorize: true,
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname,responseTime',
        // messageFormat: '{msg} | [id={reqId} {req.method} {req.url}]'
      },
    },
  },
  production: true,
  test: false,
}
