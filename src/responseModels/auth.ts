export = {
  SignUpRequest: {
    200: {
      body: {
        type: 'object',
        example: {
          id: 1,
          firstName: 'First Name',
          lastName: 'Last Name',
          email: 'someone@example.com',
          createdAt: '2021-10-05T13:50:41.868Z',
          updatedAt: '2021-10-05T13:50:41.868Z',
        },
      },
    },
    409: {
      body: {
        type: 'object',
        example: {
          message: 'Password and confirm password is not same',
          code: 'PASSWORD_MISMATCHED',
        },
      },
    },
  },
  SignInRequest: {
    200: {
      body: {
        type: 'object',
        example: {
          authToken: 'eyJhbGciOiJIUzI1NiJ9.eyJOYW1lIjoiUml0aWsgSmFpbiJ9.OENs7sVbpa5BpVH0LkqH5V0uuqwsfizV2u1Psa_G6R0',
        },
      },
    },
    401: {
      body: {
        type: 'object',
        example: {
          message: 'Invalid password',
          code: 'INVALID_PASSWORD',
        },
      },
    },
    404: {
      body: {
        type: 'object',
        example: {
          message: 'User not found',
          code: 'USER_NOT_FOUND',
        },
      },
    },
  },
  ForgotPasswordRequest: {
    200: {
      body: {
        type: 'object',
        example: {},
      },
    },
    404: {
      body: {
        type: 'object',
        example: {
          message: 'User not found',
          code: 'USER_NOT_FOUND',
        },
      },
    },
  },
  ResetPasswordRequest: {
    200: {
      body: {
        type: 'object',
        example: {
          id: 1,
          firstName: 'First Name',
          lastName: 'Last Name',
          email: 'someone@example.com',
          createdAt: '2021-10-05T13:50:41.868Z',
          updatedAt: '2021-10-05T13:50:41.868Z',
        },
      },
    },
    404: {
      body: {
        type: 'object',
        example: {
          message: 'User not found',
          code: 'USER_NOT_FOUND',
        },
      },
    },
  },
  ChangePasswordRequest: {
    200: {
      body: {
        type: 'object',
        example: {
          id: 1,
          firstName: 'First Name',
          lastName: 'Last Name',
          email: 'someone@example.com',
          createdAt: '2021-10-05T13:50:41.868Z',
          updatedAt: '2021-10-05T13:50:41.868Z',
        },
      },
    },
    401: {
      body: {
        type: 'object',
        example: {
          message: 'Invalid password',
          code: 'INVALID_PASSWORD',
        },
      },
    },
    404: {
      body: {
        type: 'object',
        example: {
          message: 'User not found',
          code: 'USER_NOT_FOUND',
        },
      },
    },
  },
};
