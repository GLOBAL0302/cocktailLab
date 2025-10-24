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

interface IIngredient {
  title: string;
  amount: string;
}

export interface ICocktailFields {
  user: IUserFields;
  title: string;
  receipt: string;
  ingredients: IIngredient[];
  password: string;
  image: string;
}
