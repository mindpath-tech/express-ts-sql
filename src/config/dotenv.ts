import dotenv from 'dotenv';

type DotEnvResponse = {
  env: NodeJS.ProcessEnv;
  isProduction: boolean;
  isTest: boolean;
};

export function loadDotEnv(): DotEnvResponse {
  const env = process.env;
  const dotEnvResponse = {
    env,
    isProduction: env.NODE_ENV === 'production',
    isTest: env.NODE_ENV === 'test' || env.NODE_ENV === 'ci',
  };

  /**
   * Do not ever use dotenv in production. Set all the env variables on cloud.
   */
  if (!dotEnvResponse.isProduction) {
    dotenv.config({
      path: process.env.DOTENV_CONFIG_PATH,
    });
  }

  return {
    env,
    isProduction: env.NODE_ENV === 'production',
    isTest: env.NODE_ENV === 'test' || env.NODE_ENV === 'ci',
  };
}
