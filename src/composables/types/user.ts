
export interface UserRegisterParam {
  username: string;
  email: string;
  password: string;
}
export interface UserLoginParam {
  email: string;
  password: string;
}

export interface UserMe {
  bio?: string;
  email: string;
  image?: string;
  token: string;
  username: string;
}

export interface UserMeUpdate {
  bio?: string;
  email: string;
  image?: string;
  password: string;
  username: string;
}

