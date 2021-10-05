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
  userId: number;
  oldPassword: string;
  newPassword: string;
};

export type ResetPasswordRequest = {
  userId: number;
  token: string;
  newPassword: string;
};

export type ForgotPasswordRequest = {
  email: string;
};
