import Joi from 'joi';

export = {
  0: {
    query: {
      page: Joi.number().required(),
      limit: Joi.number().required(),
    },
    model: 'GetUsersRequest',
    group: 'User',
    description: 'Get list of all users',
  },
  1: {
    body: {
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required().trim(),
    },
    model: 'UpdateUserRequest',
    group: 'User',
    description: 'Update user details',
  },
  2: {
    model: 'GetUser',
    group: 'User',
    description: 'Get a user details',
  },
  3: {
    params: {
      userId: Joi.number(),
    },
    model: 'DeleteUser',
    group: 'User',
    description: 'Delete a user',
  },
};
