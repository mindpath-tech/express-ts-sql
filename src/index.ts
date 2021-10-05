import { DEFAULT_LOCALE, isProduction, serverConfig } from './config';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import swagger from '../src/privateLibs/swagger-generator-express';
import path from 'path';
import fs from 'fs';
import RequestContext from './helpers/context';
import ResponseHandler from './helpers/responseHandler';
import helmet from 'helmet';
import EmailService from './utils/email';

const app = express();

if (!isProduction) {
  EmailService.loadTestAccount();
}

app.use(cors());
app.use(helmet());

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

// Middleware to initialize request context
app.use((req: Request, res: Response, next: NextFunction) => {
  req.context = new RequestContext(req);
  req.locale =
    (req.headers['Accept-Language'] as string) || (req.headers['accept-language'] as string) || DEFAULT_LOCALE;
  next();
});

app.get('/health', function (req: Request, res: Response) {
  req.context.logInfo({
    message: 'Health check completed',
    source: 'heath',
    action: 'healthcheck',
  });
  const response = new ResponseHandler(req, res);
  return response.successResponse('okay');
});

/**
 * ----------------------------- Start of V1 APIs ------------------------
 */
fs.readdirSync(path.resolve(__dirname, 'routes', 'v1')).forEach((file) => {
  if (!file.includes('.js.') && !file.includes('.ts.') && !file.includes('.d.ts')) {
    console.log(file);
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { router, basePath } = require(`./routes/v1/${file}`);
    app.use(basePath, router);
  }
});

const server = app.listen(port, () => {
  console.info(`Started on port : ${port}`);
});

swagger.serveSwagger(app, '/swagger', swaggerOptions, {
  routePath: '../../../dist/src/routes/v1',
  requestModelPath: '../../../dist/src/requestModels',
  responseModelPath: '../../../dist/src/responseModels',
});

app.get('*', function (req: Request, res: Response) {
  const response = new ResponseHandler(req, res);
  return response.notFoundError('APIs route not found', 'RequestNotFound');
});

// error handler middleware
app.use(function (err: Error, req: Request, res: Response) {
  const locale = (req.headers['Accept-Language'] as string) || DEFAULT_LOCALE;
  const response = new ResponseHandler(req, res);
  return response.handleError(locale, err);
});

module.exports = server;
