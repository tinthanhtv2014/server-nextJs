import * as Sentry from "@sentry/node";
import { ErrorLog } from "../../models/enum/error-log.enum";
import config from "../../config/base/base-config.json"

Sentry.init({
  dsn: "https://21de3105b788175c49a19a284da1669a@o4510346741350400.ingest.de.sentry.io/4510346758717520", // thay DSN thật
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV || "development",
});

export class LogService {
  private isEnabled: boolean;

  constructor() {
    // true = bật log, false = tắt log
    this.isEnabled = config.enableLogging;
  }

  info(message: string, context?: any) {
    if (!this.isEnabled) return;
    console.log(`[INFO] ${message}`, context || "");
  }

  warn(message: string, context?: any) {
    if (!this.isEnabled) return;
    console.warn(`[WARN] ${message}`, context || "");
  }

  error(error: Error | string, context?: any) {
    if (!this.isEnabled) return;

    if (typeof error === "string") {
      console.error(`[ERROR] ${error}`, context || "");
      Sentry.captureMessage(error);
    } else {
      console.error(`[ERROR] ${error.message}`, error.stack, context || "");
      Sentry.captureException(error);
    }
  }

  businessErrorLog(controller: string, error: string, context?: any) {
    const errorLog = `[${controller}]-[${ErrorLog.BUSINESS}]: ${error}`;
    console.error(`${errorLog}, ${context}`);
    Sentry.captureMessage(errorLog);
  }

  exceptionErrorLog(apiPath: string, error: string, context?: any) {
    const errorLog = `[${apiPath}]-[${ErrorLog.EXCEPTION}]: ${error}`;
    console.error(`${errorLog}, ${context}`);
    Sentry.captureException(error);
  }
}

// Singleton export
// Tạo instance log service (singleton)
export const _logSingletonService = new LogService();
