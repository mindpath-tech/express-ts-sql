module.exports = {
  test: {
    username: 'root',
    password: '',
    database: 'testing',
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DRIVER
  },
  development: {
    username: 'root',
    password: '',
    database: 'testing',
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
  }
};