import AuthService from '@service/auth';
import ResponseHandler from '@src/helpers/responseHandler';
import { ForgotPasswordRequest, ResetPasswordRequest, SignInRequest, SignUpRequest } from '@src/types/auth';
import { generateJWT } from '@src/utils/jwt';
import { Request, Response } from 'express';

export default class AuthController {
  // private _authService: AuthService;

  constructor() {
    // TODO: Need to investigate how we can uncomment this.
    // this._authService = new AuthService();
  }

  async signUp(req: Request, res: Response): Promise<Response> {
    const _authService = new AuthService();
    const responseHandler = new ResponseHandler(req, res);
    const body = req.body as SignUpRequest;
    const { context, locale } = req;
    try {
      const user = await _authService.signUp(context, locale, body);
      const token = generateJWT({ id: user.id });
      return responseHandler.successResponse(user, {
        Authorization: token,
      });
    } catch (error) {
      return responseHandler.handleError(locale, error as Error);
    }
  }

  async signIn(req: Request, res: Response): Promise<Response> {
    const _authService = new AuthService();
    const responseHandler = new ResponseHandler(req, res);
    const body = req.body as SignInRequest;
    const { context, locale } = req;
    try {
      const user = await _authService.signIn(context, locale, body);
      const token = generateJWT({ id: user.id });
      return responseHandler.successResponse(user, {
        Authorization: token,
      });
    } catch (error) {
      return responseHandler.handleError(locale, error as Error);
    }
  }

  async resetPassword(req: Request, res: Response): Promise<Response> {
    const _authService = new AuthService();
    const responseHandler = new ResponseHandler(req, res);
    const body = req.body as ResetPasswordRequest;
    const { context, locale } = req;
    try {
      await _authService.resetPassword(context, locale, body);
      return responseHandler.successResponse();
    } catch (error) {
      return responseHandler.handleError(locale, error as Error);
    }
  }

  async forgotPassword(req: Request, res: Response): Promise<Response> {
    const _authService = new AuthService();
    const responseHandler = new ResponseHandler(req, res);
    const body = req.body as ForgotPasswordRequest;
    const { context, locale } = req;
    try {
      await _authService.forgotPassword(context, locale, body);
      return responseHandler.successResponse();
    } catch (error) {
      return responseHandler.handleError(locale, error as Error);
    }
  }

  async changePassword(req: Request, res: Response): Promise<Response> {
    const _authService = new AuthService();
    const responseHandler = new ResponseHandler(req, res);
    const changePasswordRequest = req.body;
    const userId = req.app.locals.userId;
    const { context, locale } = req;
    try {
      await _authService.changePassword(context, locale, userId, changePasswordRequest);
      return responseHandler.successResponse();
    } catch (error) {
      return responseHandler.handleError(locale, error as Error);
    }
  }
}
