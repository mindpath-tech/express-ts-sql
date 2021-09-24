import { serverConfig } from '../config';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import RequestContext from './helpers/context';
import ResponseHandler from './helpers/responseHandler';

const app = express();

app.use(cors());

// request payload middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(useragent.express());

const port = serverConfig.port;

// Middleware to initialize request context
app.use((req: Request, res: Response, next: NextFunction) => {
  req.context = new RequestContext(req);
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

app.get('*', function (req: Request, res: Response) {
  const response = new ResponseHandler(req, res);
  return response.notFoundError('APIs route not found', 'RequestNotFound');
});

// error handler middleware
app.use(function (err: Error, req: Request, res: Response) {
  const response = new ResponseHandler(req, res);
  return response.serverError(err.message, 'InternalServerError', err.stack);
});

module.exports = server;
