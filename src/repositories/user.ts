import User, { IUserAttributes } from '@models/user';

export default class UserRepository {
  async createUser(userAttributes: IUserAttributes): Promise<IUserAttributes> {
    const user = new User(userAttributes);
    return await user.save();
  }
}
