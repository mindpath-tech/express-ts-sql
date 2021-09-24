import { Dialect } from 'sequelize/types';
import { loadDotEnv } from './dotenv';
const { env, isProduction, isTest } = loadDotEnv();
export { isProduction, isTest };

export interface ServerConfig {
  port: string;
  dbName: string;
  dbUser: string;
  dbHost: string;
  dbDriver: string;
  dbPassword: string;
  dbPort: number;
}

/**
 * Derive all the environment variables from this property instead of using them directly.
 */
export const serverConfig: ServerConfig = {
  port: (env.PORT as string) || '3000',
  dbName: (env.DB_NAME as string) || 'testing',
  dbUser: (env.DB_USER as string) || 'root',
  dbHost: (env.DB_HOST as string) || 'localhost',
  dbDriver: (env.DB_DRIVER as Dialect) || 'mysql',
  dbPassword: (env.DB_PASSWORD as string) || '',
  dbPort: env.DB_PORT ? parseInt(env.DB_PORT) : 3306,
};
