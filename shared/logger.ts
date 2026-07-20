export class Logger {
  static info(message: string, data?: unknown) {
    console.log(
      JSON.stringify({
        level: "INFO",
        message,
        data,
        timestamp: new Date().toISOString(),
      })
    );
  }

  static error(message: string, data?: unknown) {
    console.error(
      JSON.stringify({
        level: "ERROR",
        message,
        data,
        timestamp: new Date().toISOString(),
      })
    );
  }
}