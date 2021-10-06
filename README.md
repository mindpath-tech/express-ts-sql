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

## Contributors

[Vikas Patidar](https://www.linkedin.com/in/vikas-patidar-0106/)

[Ritik Jain](https://www.linkedin.com/in/ritik756/)

[Krishan Kripal](https://www.linkedin.com/in/b2banna/)
