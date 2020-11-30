const expressPino = require("pino-http");
const pino = require("pino");

const devOpts = {
  prettyPrint: { colorize: true }
};

let requestLog;
let logger;

if (process.env.NODE_ENV === "production") {
  requestLog = expressPino();
  logger = pino();
} else {
  requestLog = expressPino(devOpts);
  logger = pino(devOpts);
}

module.exports.requestLogger = requestLog;
module.exports.logger = logger;
