import { Request, Response } from 'express';

export default class AuthController {
  async signUp(req: Request, res: Response): Promise<Response> {
    return res.status(200).send();
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
