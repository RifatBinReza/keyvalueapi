const Sequelize = require('sequelize')
/**
 * Connect to the database instance
 */
const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: "postgres"
  }
);

/**
 * Get all the models for exporting
 */
const models = {
  keyValue: require('./key_value')
};

Object.keys(models).forEach(key => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});
module.exports = { sequelize, models };