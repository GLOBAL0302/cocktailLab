export interface IUserFields {
  username: string;
  password: string;
  displayName: string;
  mail: string;
  avatar: string;
  role: string;
  googleId: string;
  token: string;
}

export interface IUserSignInMuation {
  username: string;
  password: string;
  displayName: string;
  mail: string;
  avatar: File | null;
}

export interface IUserLoginMuation {
  username: string;
  password: string;
}
