const {config} = require("dotenv");
require('dotenv').config();
let { PG_CONNECTION_STRING,DB_SSL} = process.env;



module.exports = {
  database_config:{
    client: 'pg',
  connection: {
  connectionString: PG_CONNECTION_STRING,
    port : 5432,
  },
  ssl: config[DB_SSL] ? { rejectUnauthorized: false } : false,
  },
  production: {
    client: 'pg',
  connection: {
  connectionString: PG_CONNECTION_STRING,
    port : 5432,
  },
  ssl: config[DB_SSL] ? { rejectUnauthorized: false } : false,

  }

}