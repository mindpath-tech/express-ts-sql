import { Dialect, Sequelize } from 'sequelize';
import { serverConfig } from "./common";

const dbName = serverConfig.db_name;
const dbUser = serverConfig.db_user;
const dbHost = serverConfig.db_host;
const dbDriver = serverConfig.db_driver as Dialect;
const dbPassword = serverConfig.db_password;
const MAX_CONNECTION = 5;

const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDriver,
  pool: {
    max: MAX_CONNECTION,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

export { sequelizeConnection };
