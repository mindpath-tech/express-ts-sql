import { IUserAttributes } from '@models/user';
import { getMessage } from '@src/config/messages';
import { PASSWORD_MISMATCHED } from '@src/config/messages/codes';
import RequestContext from '@src/helpers/context';
import { CustomErrorHandler } from '@src/helpers/customErrorHandler';
import UserRepository from '@src/repositories/user';
import { SignUpRequest } from '@src/types/auth';
import { Request, Response } from 'express';

export default class AuthService {
  private _userRepository: UserRepository;

  constructor() {
    this._userRepository = new UserRepository();
  }

  async signUp(context: RequestContext, locale: string, signUpRequest: SignUpRequest): Promise<IUserAttributes> {
    const { password, confirmPassword } = signUpRequest;
    if (!this._isConfirmPasswordMatched(password, confirmPassword)) {
      context.logError({
        message: getMessage(PASSWORD_MISMATCHED),
        action: PASSWORD_MISMATCHED,
        source: 'AuthService#signUp',
      });
      const message = getMessage(PASSWORD_MISMATCHED, locale);
      throw new CustomErrorHandler(409, message, PASSWORD_MISMATCHED);
    }
    return await this._userRepository.createUser(signUpRequest as unknown as IUserAttributes);
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

  private _isConfirmPasswordMatched(password: string, confirmPassword: string): boolean {
    return password === confirmPassword;
  }
}
