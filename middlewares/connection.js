const {Pool} = require('pg');
// change password before executing the project
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "password", //postgreSQL password
  port: 5432,
})

module.exports = pool;
