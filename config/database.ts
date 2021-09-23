import { Dialect, Sequelize } from 'sequelize';
import { serverConfig } from "./common";

const dbName = serverConfig.dbName;
const dbUser = serverConfig.dbUser;
const dbHost = serverConfig.dbHost;
const dbDriver = serverConfig.dbDriver as Dialect;
const dbPassword = serverConfig.dbPassword;
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
