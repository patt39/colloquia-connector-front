export type User = {
  id: string;
  name: string;
  email: string;
  // Add other user properties as needed
};

export type UserLoginReq = {
  email: string;
  password: string;
};

export type UserForgotPasswordReq = {
  email: string;
};
