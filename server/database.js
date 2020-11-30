const mongoose = require("mongoose");
const { logger } = require("./middleware/logger");

module.exports = (app) => {
  mongoose.connect(process.env.DATABASE_URL, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  const db = mongoose.connection;

  db.on("error", (err) => {
    logger.error(err);
  });
  db.once("connected", () => {
    logger.info("Mongo connected");
    app.emit("ready");
  });
  db.on("reconnected", () => {
    logger.info("Mongo re-connected");
  });
  db.on("disconnected", () => {
    logger.info("Mongo disconnected");
  });
};
