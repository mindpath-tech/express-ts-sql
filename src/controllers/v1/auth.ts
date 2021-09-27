import AuthService from '@service/auth';
import ResponseHandler from '@src/helpers/responseHandler';
import { SignUpRequest } from '@src/types/auth';
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
      return responseHandler.successResponse(user);
    } catch (error) {
      return responseHandler.handleError(locale, error as Error);
    }
  }

  async signIn(req: Request, res: Response): Promise<Response> {
    return res.status(200).send();
  }

  async resetPassword(req: Request, res: Response): Promise<Response> {
    return res.status(200).send();
  }

  async forgotPassword(req: Request, res: Response): Promise<Response> {
    return res.status(200).send();
  }

  async changePassword(req: Request, res: Response): Promise<Response> {
    return res.status(200).send();
  }
}
