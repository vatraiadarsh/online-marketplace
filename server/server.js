const { logger } = require("./middleware/logger");

module.exports = (app) => {
  const { PORT, HTTP_HOST } = process.env;

  const port = PORT || 8000;
  app.listen(port, () => {
    logger.info(`Running on ${HTTP_HOST}:${port}`);
  });
};
