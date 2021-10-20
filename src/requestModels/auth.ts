import Joi from 'joi';

export = {
  0: {
    body: {
      email: Joi.string().email().required().trim(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      password: Joi.string().required(),
      confirmPassword: Joi.string().required(),
    },
    model: 'SignUpRequest',
    group: 'Auth',
    description: 'Create user and save details in database',
  },
  1: {
    body: {
      email: Joi.string().email().required().trim(),
      password: Joi.string().required(),
    },
    model: 'SignInRequest',
    group: 'Auth',
    description: 'Sign in user',
  },
  2: {
    body: {
      email: Joi.string().email().required().trim(),
    },
    model: 'ForgotPasswordRequest',
    group: 'Auth',
    description: 'Send password reset link to email',
  },
  3: {
    body: {
      token: Joi.string().required(),
      newPassword: Joi.string().required(),
    },
    model: 'ResetPasswordRequest',
    group: 'Auth',
    description: 'Change user password to a new password',
  },
  4: {
    body: {
      oldPassword: Joi.string().required(),
      newPassword: Joi.string().required(),
    },
    model: 'ChangePasswordRequest',
    group: 'Auth',
    description: 'Update user password',
  },
};
