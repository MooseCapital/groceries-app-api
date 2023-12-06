const knex = require('knex')
const knexfile = require('./knexfile');

const db = knex(knexfile.database_config);
module.exports = db;
