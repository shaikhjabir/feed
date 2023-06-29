import { createLogger, transports } from "winston";

export const logger = createLogger({
  level: "debug",
  transports: [new transports.Console()],
});
