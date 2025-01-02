const express = require('express')
const cors = require('cors')
const authRoute = require('./routes/authRoute')

const { Model } = require("objection");
const Knex = require("knex");
const path = require('path');

require('dotenv').config({path:'./.env'})

const config = {
    client: "mysql2",
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    },
    migrations: {
      directory: path.join(__dirname, "migrations"),
    },
  }
  
const knex = Knex(config);


knex.raw("SELECT 1+1 AS result")
.then(() => {
    console.log("Database connection is working!");
})
.catch((err) => {
    console.error("Error connecting to database:", err);
});

Model.knex(knex);


const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/auth',authRoute)

app.listen(5000,()=>{
    console.log("Listening to port 5000.....")
})

module.exports = config;