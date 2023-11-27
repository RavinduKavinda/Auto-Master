const dotenv = require("dotenv").config();
const Sequelize = require("sequelize");

const dbConnection = new Sequelize(process.env.DB_URL, {
  dialect: "mysql",
  logging: false,
});

module.exports = { dbConnection };
