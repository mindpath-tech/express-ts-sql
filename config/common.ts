import { loadDotEnv } from './dotenv';
const { env, isProduction, isTest } = loadDotEnv();
export { isProduction, isTest };

export interface ServerConfig {
  port: string;
}

/**
 * Derive all the environment variables from this property instead of using them directly.
 */
export const serverConfig: ServerConfig = {
  port: (env.PORT as string) || '3000',
};
