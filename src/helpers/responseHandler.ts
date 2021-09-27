import { getMessage } from '@src/config/messages';
import { INTERNAL_SERVER_ERROR } from '@src/config/messages/codes';
import { Request, Response } from 'express';
import { CustomErrorHandler } from './customErrorHandler';

export default class ResponseHandler {
  private req: Request;
  private res: Response;
  constructor(req: Request, res: Response) {
    this.req = req;
    this.res = res;
  }

  successResponse<T>(data?: T): Response {
    this.req.context.logEnd();
    return this.res.status(200).send(data);
  }

  badRequestError(message: string, code: string): Response {
    return this.errorResponse(400, message, code);
  }

  forbiddenError(message: string, code: string): Response {
    return this.errorResponse(403, message, code);
  }

  notFoundError(message: string, code: string): Response {
    return this.errorResponse(404, message, code);
  }

  errorResponse(status: number, message: string, code: string, stack?: any): Response {
    this.req.context.logEnd();
    const errorResponse = {
      message,
      code,
      stack,
    };
    return this.res.status(status).send(errorResponse);
  }

  handleError(locale: string, error: Error): Response {
    if (error instanceof CustomErrorHandler) {
      const { status, message, code } = error;
      return this.errorResponse(status, message, code);
    }
    if (error instanceof Error) {
      return this.errorResponse(500, error.message, INTERNAL_SERVER_ERROR, error.stack);
    }
    const message = getMessage(INTERNAL_SERVER_ERROR, locale);
    return this.errorResponse(500, message, INTERNAL_SERVER_ERROR);
  }
}
