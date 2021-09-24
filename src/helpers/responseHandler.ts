import { Request, Response } from 'express';

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

  serverError(message: string, code: string, stack: any): Response {
    return this.errorResponse(500, message, code, stack);
  }

  errorResponse<T>(status: number, message: string, code: string, stack?: any): Response {
    this.req.context.logEnd();
    const errorResponse = {
      message,
      code,
      stack,
    };
    return this.res.status(status).send(errorResponse);
  }
}
