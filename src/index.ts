import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import HttpStatus from 'http-status-codes';
import { config } from 'dotenv';
config();

const app = express();

app.use(cors());

// request payload middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(useragent.express());

app.get('*', function (req: Request, res: Response, next: NextFunction) {
  return res.status(404).send({ message: 'APIs route not found' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.info(`Started on port : ${PORT}`);
});

// error handler middleware
app.use(function (err: Error, req: Request, res: Response) {
  console.log(`Something went wrong ${err.message}`);
  return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    message: err.message,
    body: {},
  });
});
