import { Request, Response } from 'express';

export default class UserController {
  async getUsers(req: Request, res: Response): Promise<Response> {
    return res.status(200).send();
  }

  async getUser(req: Request, res: Response): Promise<Response> {
    return res.status(200).send();
  }

  async updateUser(req: Request, res: Response): Promise<Response> {
    return res.status(200).send();
  }

  async deleteUser(req: Request, res: Response): Promise<Response> {
    return res.status(200).send();
  }
}
