const { Model } = require("objection");
const Knex = require("knex");
const path = require("path");

const config = {
  client: "mysql2",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "akrivia",
    database: "auth",
  },
  migrations: {
    directory: path.join(__dirname, "migrations"),
  },
};
const knex = Knex(config);

knex
  .raw("SELECT 1+1 AS result")
  .then(() => {
    console.log("Database connection is working!");
  })
  .catch((err) => {
    console.error("Error connecting to database:", err);
  });

Model.knex(knex);
module.exports = config;
