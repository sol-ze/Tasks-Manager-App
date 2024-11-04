const knex = require("knex")({
  client: "mysql2",
  connection: {
    host: process.env.HOST,
    port: process.env.MYSQLPORT,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASS,
    database: process.env.MYSQLDB,
  },
});

module.exports = knex;
