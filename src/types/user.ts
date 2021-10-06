import { IUserAttributes } from '@models/user';

export type GetUsersRequest = {
  page: number;
  limit: number;
};

export type QueryOptions = {
  where?: Partial<IUserAttributes>;
  attributes?: Array<string>;
  limit?: number;
  offset?: number;
};

export type QueryMetaData = {
  page: number;
  limit: number;
};

export type FindUsersResult = {
  users: Array<IUserAttributes>;
  metaData: {
    hasMore: boolean;
    count: number;
  };
};

export type UpdateUserRequest = {
  firstName: string;
  lastName: string;
  email: string;
};
