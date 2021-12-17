import User, { IUserAttributes } from '@models/user';
import { FindUsersResult, QueryMetaData, QueryOptions } from '@src/types/user';
export default class UserRepository {
  async createUser(userAttributes: IUserAttributes): Promise<IUserAttributes> {
    const user = new User(userAttributes);
    return await user.save();
  }

  async findUser(filter: Partial<IUserAttributes>, selectAttributes?: Array<string>): Promise<User | null> {
    const user = await User.findOne({ where: filter, attributes: selectAttributes });
    return user;
  }

  async findUsers(
    queryMetaData: QueryMetaData,
    filter?: Partial<IUserAttributes>,
    selectAttributes?: Array<string>,
  ): Promise<FindUsersResult> {
    const { page, limit } = queryMetaData;
    const offset = (page - 1) * limit;
    const options: QueryOptions = {
      limit,
      offset,
    };
    if (filter) {
      options.where = filter;
    }
    if (selectAttributes && selectAttributes.length) {
      options.attributes = selectAttributes;
    }
    const findAndCountAll = await User.findAndCountAll(options);
    const result = {
      users: findAndCountAll.rows,
      metaData: {
        count: findAndCountAll.count,
        hasMore: false,
      },
    };

    if (findAndCountAll.count > page * limit) {
      result.metaData.hasMore = true;
    }
    return result;
  }

  async deleteUser(filter: Partial<IUserAttributes>): Promise<number> {
    return await User.destroy({ where: filter });
  }

  async updateUser(filter: Partial<IUserAttributes>, data: Partial<IUserAttributes>): Promise<number> {
    const result = await User.update(data, {
      where: filter,
    });
    return result[0];
  }
}
