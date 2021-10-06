export type SignUpRequest = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
};

export type SignInRequest = {
  email: string;
  password: string;
};

export type ChangePasswordRequest = {
  oldPassword: string;
  newPassword: string;
};

export type ResetPasswordRequest = {
  token: string;
  newPassword: string;
};

export type ForgotPasswordRequest = {
  email: string;
};
