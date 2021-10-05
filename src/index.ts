import { serverConfig } from '../config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import HttpStatus from 'http-status-codes';
import logger from '@mindpath/logger';
import swagger from '../src/privateLibs/swagger-generator-express';
import fs from 'fs';
import path from 'path';

const app = express();

app.use(cors());

// request payload middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(useragent.express());

const swaggerOptions = {
  title: 'express-ts-sql',
  version: '1.0.0',
  host: 'localhost',
  basePath: '/',
  schemes: ['https', 'http'],
  securityDefinitions: {
    Bearer: {
      description: 'Example value:- Bearer eyJhbGciOiJIUzI1NiJ9.eyJOYW1lIjoiUml0aWsgSmFpbiJ9.OENs7sVbpa5BpVH0LkqH5V0uuqwsfizV2u1Psa_G6R0',
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
    },
  },
  parameters: {
    timezone: {
      description: 'Asia/Calcutta',
      type: 'string',
      name: 'timezone',
      in: 'header',
    },
    urlDomain: {
      description: 'localhost',
      type: 'string',
      name: 'urlDomain',
      in: 'header',
    },
  },
  security: [{ Bearer: [] }],
  defaultSecurity: 'Bearer',
};

const port = serverConfig.port;

fs.readdirSync(path.resolve(__dirname, 'routes', 'v1')).forEach((file) => {
  if (file.includes('.js') && !file.includes('.js.')) {
    console.log(file);
    const { router, basePath } = require(`./routes/v1/${file}`);
    app.use(basePath, router);
  }
});

app.get('/health', function (req, res) {
  res.status(200).send('ok');
});

const server = app.listen(port, () => {
  console.info(`Started on port : ${port}`);
});

swagger.serveSwagger(app, '/swagger', swaggerOptions, {
  routePath: './dist/src/routes/v1',
  requestModelPath: './dist/src/requestModels',
  responseModelPath: './dist/src/responseModels',
});

app.get('*', function (req: Request, res: Response) {
  return res.status(404).send({ message: 'APIs route not found' });
});

// error handler middleware
app.use(function (err: Error, req: Request, res: Response) {
  logger.error(`Something went wrong ${err.message}`);
  return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    message: err.message,
    body: {},
  });
});

module.exports = server;
