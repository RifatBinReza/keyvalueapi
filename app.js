/**
 * Module dependencies.
 */
require("dotenv").config(); //Load environment variables to access from process.env
const express = require("express");
const bodyParser = require("body-parser");
const chalk = require("chalk");
const dotenv = require("dotenv");
const errorHandler = require("errorhandler");
const moment = require("moment");

/**
 * Require essentials like routes, models, controllers etc
 */
const { sequelize, models } = require("./model");
const apiRoutes = require('./routes/api')

/**
 * Create Express server.
 */
const app = express();

/**
 * Express configuration.
 */
app.set("host", process.env.OPENSHIFT_NODEJS_IP || "0.0.0.0");
app.set("port", process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 3000);
app.use(bodyParser.json({ limit: "5mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "5mb",
    extended: true,
    parameterLimit: 50000
  })
);

/**
 * API Routes
 */
app.use('/api', apiRoutes)


/**
 * Error Handler.
 */
app.get("*", (req, res) => {
  res.redirect("/");
});

if (process.env.NODE_ENV === "development") {
  // only use in development
  app.use(errorHandler());
} else {
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send("Server Error");
  });
}

/**
 * Connect the database and start Express server.
 */
sequelize.sync().then(() => {
  let server = app.listen(app.get("port"), () => {
    console.log(
      "%s App is running at http://localhost:%d in %s mode",
      chalk.green("✓"),
      app.get("port"),
      app.get("env")
    );
    console.log("  Press CTRL-C to stop\n");
  });
});
