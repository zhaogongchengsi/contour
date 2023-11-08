import { createLogger, format, transports } from "winston";
import type { Logger } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

let logger: Logger | null = null;

const name = "contour";

export const useLogger = () => {
  if (!logger) {
    const { log } = useRuntimeConfig();

    // see: https://github.com/winstonjs/logform
    const { combine, timestamp, colorize, json, printf } = format;

    const transport = isDev()
      ? new transports.Console({
          format: combine(
            colorize(),
            printf((info) => `${info.level}: ${info.message}`),
          ),
        })
      : new DailyRotateFile({
          filename: `app-%DATE%.log`,
          datePattern: "YYYY-MM-DD-HH",
          zippedArchive: true,
          maxSize: "20m",
          maxFiles: "14d",
          dirname: log?.direction,
        });

    logger = createLogger({
      level: log?.level || "info",
      format: combine(timestamp(), json()),
      defaultMeta: { service: name },
      transports: [transport],
    });
  }

  return logger;
};
