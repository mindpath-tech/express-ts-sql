import { serverConfig } from '../config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import HttpStatus from 'http-status-codes';
import logger from '@mindpath/logger';

const app = express();

app.use(cors());

// request payload middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(useragent.express());

const port = serverConfig.port;
app.get('/health', function (req, res) {
  res.status(200).send('ok');
});

const server = app.listen(port, () => {
  console.info(`Started on port : ${port}`);
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
