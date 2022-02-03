# express-ts-sql

## Description

## Logger Tools
### Set following env to your code.
```sh
NODE_ENV='development' #development, production, test
PORT=3000 # Server port
LOG_LEVEL='debug' #Refer below Log levels section for value.
LOGS_PROVIDERS='[{"name": "console"},{"name": "grafana","url": "https://example.com"}]' #Provider which needs to support. You can remove if you don't want it.
SERVICE_LABEL='express-ts-sql' # Name of the service.
DB_NAME='express-ts-sql' # Name of database
DB_USER='root' # Name of user in database
DB_HOST='localhost' # Database host
DB_DRIVER='mysql' # Database type "mysql" | "postgres" | "sqlite" | "mariadb" | "mssql"
DB_PASSWORD='' # Database password
DB_PORT=3306 # Database port
JWT_SECRET_KEY='some_secret_key' # JWT secret (random key characters)
EMAIL_HOST='smtp.ethereal.email' # Email host address
EMAIL_USER='' # Email username
EMAIL_PASS='' # Email password
```
### Log Levels
Below are npm logging levels that are prioritized from 0 to 6 (highest to lowest):
 ```sh
error: 0,
warn: 1,
info: 2,
http: 3,
verbose: 4,
debug: 5,
silly: 6
```
For documentation refer here https://www.npmjs.com/package/@mindpath/logger

### Local Setup
1. Create .env file at root folder and set above environment variables.
2. Install yarn globally `npm install -g yarn`.
3. Install packages `yarn install`.
4. Create a database `yarn db:create`.
5. Run the migrations `yarn db:migrate`.
6. Start the local server `yarn start:dev`.

### API Documentation
Open `http://localhost:3000/swagger/` on your browser to check the APIs.

## Contributors

[Vikas Patidar](https://www.linkedin.com/in/vikas-patidar-0106/)

[Ritik Jain](https://www.linkedin.com/in/ritik756/)