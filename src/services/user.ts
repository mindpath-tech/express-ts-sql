import User from '@models/user';
import UserRepository from '@src/repositories/user';
import { FindUsersResult, GetUsersRequest, UpdateUserRequest } from '@src/types/user';
export default class UserService {
  private _userRepository: UserRepository;

  constructor() {
    this._userRepository = new UserRepository();
  }

  async getUsers(getUsersRequest: GetUsersRequest): Promise<FindUsersResult> {
    const result = await this._userRepository.findUsers({
      page: getUsersRequest.page,
      limit: getUsersRequest.limit,
    });
    return result;
  }

  async getUser(userId: number): Promise<User | null> {
    return await this._userRepository.findUser({
      id: userId,
    });
  }

  async updateUser(userId: number, updateUserRequest: UpdateUserRequest): Promise<void> {
    await this._userRepository.updateUser(
      {
        id: userId,
      },
      updateUserRequest,
    );
    return;
  }

  async deleteUser(userId: number): Promise<void> {
    await this._userRepository.deleteUser({
      id: userId,
    });
    return;
  }
}
