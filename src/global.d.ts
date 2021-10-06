import { Dialect } from 'sequelize/types';
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'production' | 'development' | 'test' | 'ci';
      PORT: string;
      DB_NAME: string;
      DB_USER: string;
      DB_HOST: string;
      DB_DRIVER: Dialect;
      DB_PASSWORD: string;
      DB_PORT: number;
      JWT_SECRET_KEY: string;
      EMAIL_HOST: string;
      EMAIL_USER: string;
      EMAIL_PASS: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
// eslint-disable-next-line prettier/prettier
export { };
