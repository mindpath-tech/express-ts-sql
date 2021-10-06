export = {
  GetUsersRequest: {
    200: {
      body: {
        type: 'object',
        example: {
          users: [
            {
              id: 1,
              firstName: 'First Name',
              lastName: 'Last Name',
              email: 'someone@example.com',
              password: '********',
              token: 'eyJhbGciOiJIUzI1NiJ9.eyJOYW1lIjoiUml0aWsgSmFpbiJ9.OENs7sVbpa5BpVH0LkqH5V0uuqwsfizV2u1Psa_G6R0',
              createdAt: '2021-10-05T13:50:41.868Z',
              updatedAt: '2021-10-05T13:50:41.868Z',
            },
          ],
          metaData: {
            hasMore: true,
            count: 75,
          },
        },
      },
    },
  },
  UpdateUserRequest: {
    200: {
      body: {
        type: 'object',
        example: {},
      },
    },
  },
  GetUser: {
    200: {
      body: {
        type: 'object',
        example: {
          id: 1,
          firstName: 'First Name',
          lastName: 'Last Name',
          email: 'someone@example.com',
          password: '********',
          token: 'eyJhbGciOiJIUzI1NiJ9.eyJOYW1lIjoiUml0aWsgSmFpbiJ9.OENs7sVbpa5BpVH0LkqH5V0uuqwsfizV2u1Psa_G6R0',
          createdAt: '2021-10-05T13:50:41.868Z',
          updatedAt: '2021-10-05T13:50:41.868Z',
        },
      },
    },
  },
  DeleteUser: {
    200: {
      body: {
        type: 'object',
        example: {},
      },
    },
  },
};
