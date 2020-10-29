require('dotenv').config();

const env = process.env;

const development = {
  username: env.username,
  password: env.password,
  database: env.database,
  host: env.host,
  port: env.port,
  dialect: env.dialect
};

const test = {
  username: env.username,
  password: env.password,
  database: env.database,
  host: env.host,
  port: env.port,
  dialect: env.dialect
};

const production = {
  username: env.username,
  password: env.password,
  database: env.database,
  host: env.host,
  port: env.port,
  dialect: env.dialect
};

module.exports = { development, test, production };
