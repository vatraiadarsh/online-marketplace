const authRouter = require("./modules/auth/routes");

module.exports = (app) => {
  app.use("/", authRouter);
 
};

