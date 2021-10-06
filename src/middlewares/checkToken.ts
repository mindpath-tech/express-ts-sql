import { getMessage } from '@src/config/messages';
import { UNAUTHORIZED_ERROR } from '@src/config/messages/codes';
import RequestContext from '@src/helpers/context';
import ResponseHandler from '@src/helpers/responseHandler';
import UserRepository from '@src/repositories/user';
import { validateJwtToken } from '@src/utils/jwt';
import { NextFunction, Request, Response } from 'express';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function checkToken(req: Request, res: Response, next: NextFunction) {
  const responseHandler = new ResponseHandler(req, res);
  const { context, locale } = req;
  try {
    const bearerToken = req.headers.authorization;
    if (!bearerToken) {
      return _formErrorMessage(responseHandler, context, locale);
    }
    const token = bearerToken.split('Bearer')[1].trim();
    const payload = await validateJwtToken(token);
    if (payload === null) {
      return _formErrorMessage(responseHandler, context, locale);
    }
    const id = payload.id;
    const user = await new UserRepository().findUser({ id }, ['id']);
    if (!user) {
      return _formErrorMessage(responseHandler, context, locale);
    }
    req.app.locals.userId = id;
    return next();
  } catch (error) {
    return responseHandler.handleError(locale, error as Error);
  }
}

function _formErrorMessage(responseHandler: ResponseHandler, context: RequestContext, locale: string) {
  const code = UNAUTHORIZED_ERROR;
  context.logError({
    message: getMessage(code),
    action: code,
    source: 'middleware#checkToken',
  });
  const message = getMessage(code, locale);
  return responseHandler.unauthorizedError(message, code);
}
