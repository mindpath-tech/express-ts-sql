import { Dialect } from 'sequelize/types';
import { loadDotEnv } from './dotenv';
const { env, isProduction, isTest } = loadDotEnv();
export { isProduction, isTest };

export interface ServerConfig {
  port: string;
  db_name: string;
  db_user: string;
  db_host: string;
  db_driver: string;
  db_password: string
}

/**
 * Derive all the environment variables from this property instead of using them directly.
 */
export const serverConfig: ServerConfig = {
  port: (env.PORT as string) || '3000',
  db_name: (env.DB_NAME as string) || 'testing',
  db_user: (env.DB_USER as string) || 'root',
  db_host: (env.DB_HOST as string) || 'localhost',
  db_driver: (env.DB_DRIVER as Dialect) || 'mysql',
  db_password: (env.DB_PASSWORD as string) || '',
};
