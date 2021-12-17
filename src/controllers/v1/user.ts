import UserService from '@service/user';
import ResponseHandler from '@src/helpers/responseHandler';
import { Request, Response } from 'express';

export default class UserController {
  async getUsers(req: Request, res: Response): Promise<Response> {
    const _userService = new UserService();
    const responseHandler = new ResponseHandler(req, res);
    const queryParams = req.query;
    const getUsersRequest = {
      page: parseInt(queryParams.page as string),
      limit: parseInt(queryParams.limit as string),
    };
    try {
      const response = await _userService.getUsers(getUsersRequest);
      return responseHandler.successResponse(response);
    } catch (error) {
      return responseHandler.handleError(req.locale, error as Error);
    }
  }

  async getUser(req: Request, res: Response): Promise<Response> {
    const _userService = new UserService();
    const responseHandler = new ResponseHandler(req, res);
    const userId = req.app.locals.id;
    try {
      const response = await _userService.getUser(userId);
      return responseHandler.successResponse(response);
    } catch (error) {
      return responseHandler.handleError(req.locale, error as Error);
    }
  }

  async updateUser(req: Request, res: Response): Promise<Response> {
    const _userService = new UserService();
    const responseHandler = new ResponseHandler(req, res);
    const userId = req.app.locals.id;
    const updateUserRequest = req.body;
    try {
      const response = await _userService.updateUser(userId, updateUserRequest);
      return responseHandler.successResponse(response);
    } catch (error) {
      return responseHandler.handleError(req.locale, error as Error);
    }
  }

  async deleteUser(req: Request, res: Response): Promise<Response> {
    const _userService = new UserService();
    const responseHandler = new ResponseHandler(req, res);
    const userId = req.app.locals.id;
    try {
      const response = await _userService.deleteUser(userId);
      return responseHandler.successResponse(response);
    } catch (error) {
      return responseHandler.handleError(req.locale, error as Error);
    }
  }
}
