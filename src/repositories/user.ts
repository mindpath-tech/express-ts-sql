import User, { IUserAttributes } from '@models/user';
export default class UserRepository {
  async createUser(userAttributes: IUserAttributes): Promise<IUserAttributes> {
    const user = new User(userAttributes);
    return await user.save();
  }

  async findUser(filter: Partial<IUserAttributes>, selectAttributes: Array<string>): Promise<User | null> {
    const user = await User.findOne({ where: filter, attributes: selectAttributes });
    return user;
  }
}
