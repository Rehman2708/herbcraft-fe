export interface IUser {
  name: { first: string; last: string };
  email: string;
  _id: string;
  isAdmin: boolean;
}
