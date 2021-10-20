import { IUserAttributes } from '@models/user';
import { getMessage } from '@src/config/messages';
import { INVALID_PASSWORD, PASSWORD_MISMATCHED, USER_NOT_FOUND } from '@src/config/messages/codes';
import RequestContext from '@src/helpers/context';
import { CustomErrorHandler } from '@src/helpers/customErrorHandler';
import UserRepository from '@src/repositories/user';
import {
  ChangePasswordRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  SignInRequest,
  SignUpRequest,
} from '@src/types/auth';
import EmailService from '@src/utils/email';
import { randomBytes } from 'crypto';

export default class AuthService {
  private _userRepository: UserRepository;
  private _emailService: EmailService;

  constructor() {
    this._userRepository = new UserRepository();
    this._emailService = new EmailService();
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

  async signIn(context: RequestContext, locale: string, signInRequest: SignInRequest): Promise<IUserAttributes> {
    const { email, password } = signInRequest;
    const user = await this._userRepository.findUser({ email }, ['password', 'id']);
    if (!user) {
      context.logError({
        message: getMessage(USER_NOT_FOUND),
        action: USER_NOT_FOUND,
        source: 'AuthService#signIN',
      });
      const message = getMessage(USER_NOT_FOUND, locale);
      throw new CustomErrorHandler(404, message, USER_NOT_FOUND);
    }

    if (!user.validatePassword(password)) {
      context.logError({
        message: getMessage(INVALID_PASSWORD),
        action: INVALID_PASSWORD,
        source: 'AuthService#signIN',
      });
      const message = getMessage(INVALID_PASSWORD, locale);
      throw new CustomErrorHandler(401, message, INVALID_PASSWORD);
    }
    // TODO: generate JWT.
    return user;
  }

  async resetPassword(
    context: RequestContext,
    locale: string,
    resetPasswordRequest: ResetPasswordRequest,
  ): Promise<IUserAttributes> {
    const { token, newPassword } = resetPasswordRequest;
    const user = await this._userRepository.findUser({ token }, ['id']);
    if (!user) {
      context.logError({
        message: getMessage(USER_NOT_FOUND),
        action: USER_NOT_FOUND,
        source: 'AuthService#resetPassword',
      });
      const message = getMessage(USER_NOT_FOUND, locale);
      throw new CustomErrorHandler(404, message, USER_NOT_FOUND);
    }
    user.password = newPassword;
    return await user.save();
  }

  async forgotPassword(
    context: RequestContext,
    locale: string,
    forgotPasswordRequest: ForgotPasswordRequest,
  ): Promise<void> {
    const { email } = forgotPasswordRequest;
    const user = await this._userRepository.findUser({ email }, ['id']);
    if (!user) {
      context.logError({
        message: getMessage(USER_NOT_FOUND),
        action: USER_NOT_FOUND,
        source: 'AuthService#forgotPassword',
      });
      const message = getMessage(USER_NOT_FOUND, locale);
      throw new CustomErrorHandler(404, message, USER_NOT_FOUND);
    }
    const token = randomBytes(6).toString('hex');
    const emailInfo = {
      to: email,
      subject: 'Reset Password',
      html: `Please use this token <b>${token}</b> to reset password`,
    };
    await Promise.all([user.save(), this._emailService.sendEmail(emailInfo)]);
    return;
  }

  async changePassword(
    context: RequestContext,
    locale: string,
    userId: number,
    changePasswordRequest: ChangePasswordRequest,
  ): Promise<IUserAttributes> {
    const { oldPassword, newPassword } = changePasswordRequest;
    const user = await this._userRepository.findUser({ id: userId }, ['password', 'id']);
    if (!user) {
      context.logError({
        message: getMessage(USER_NOT_FOUND),
        action: USER_NOT_FOUND,
        source: 'AuthService#changePassword',
      });
      const message = getMessage(USER_NOT_FOUND, locale);
      throw new CustomErrorHandler(404, message, USER_NOT_FOUND);
    }

    const isMatch = await user.validatePassword(oldPassword);

    if (!isMatch) {
      context.logError({
        message: getMessage(INVALID_PASSWORD),
        action: INVALID_PASSWORD,
        source: 'AuthService#changePassword',
      });
      const message = getMessage(INVALID_PASSWORD, locale);
      throw new CustomErrorHandler(401, message, INVALID_PASSWORD);
    }

    user.password = newPassword;
    return await user.save();
  }

  private _isConfirmPasswordMatched(password: string, confirmPassword: string): boolean {
    return password === confirmPassword;
  }
}
