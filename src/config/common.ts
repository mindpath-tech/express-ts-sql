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
  jwtSecretKey: string;
  emailHost: string;
  emailUser: string;
  emailPass: string;
}

/**
 * Derive all the environment variables from this property instead of using them directly.
 */
export const serverConfig: ServerConfig = {
  port: env.PORT,
  dbName: env.DB_NAME,
  dbUser: env.DB_USER,
  dbHost: env.DB_HOST,
  dbDriver: env.DB_DRIVER,
  dbPassword: env.DB_PASSWORD,
  dbPort: env.DB_PORT,
  jwtSecretKey: env.JWT_SECRET_KEY,
  emailHost: env.EMAIL_HOST,
  emailUser: env.EMAIL_USER,
  emailPass: env.EMAIL_PASS,
};

export const DEFAULT_LOCALE = 'en';
