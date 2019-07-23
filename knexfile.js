module.exports = {
  client: "postgresql",
  connection: {
    database: "tasks",
    user: "rafael",
    password: "11111111"
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: "knex_migrations"
  }
};
