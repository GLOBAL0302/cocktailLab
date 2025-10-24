export interface IUserFields {
  username: string;
  password: string;
  displayName: string;
  mail: string;
  avatar: string;
  role: string;
  token: string;
}

export interface IUserRegisterMuation {
  username: string;
  password: string;
  displayName: string;
  mail: string;
  avatar: File | null;
}

export interface IUserLoginMutation {
  username: string;
  password: string;
}

export interface ICocktail {
  _id: string;
  user: IUserFields;
  title: string;
  image: string;
  receipt: string;
  isPublished: string;
  ingredients: { title: string; amoiunt: string }[];
  ratings: { rating: number; user: IUserFields }[];
}

interface ICocktailIngredient {
  title: string;
  amount: string;
}

export interface ICocktailMutation {
  title: string;
  image: File | null;
  receipt: string;
  ingredients: ICocktailIngredient[];
}

export interface IGlobalError {
  error: string;
}

export interface IValidationError {
  errors: {
    [key: string]: {
      message: string;
      name: string;
    };
    message: string;
    name: string;
    _message: string;
  };
}
