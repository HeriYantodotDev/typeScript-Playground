import { Eventing } from "./Eventing";
import { ApiSync } from "./ApiSync";
import { Attributes } from "./Attributes";
import { Model } from "./Model";
import { Collection } from "./Collection";

export interface UserProps {
  [key: string]: string | number | undefined;
  id?: number;
  name?: string,
  age?: number
};

const SERVER_URL: string = 'http://localhost:3000/users';

export class User extends Model<UserProps> {

  static buildUser(attrs: UserProps): User {
    return new User(
      new Attributes<UserProps>(attrs),
      new Eventing(),
      new ApiSync<UserProps>(SERVER_URL)
      );
  }

  static buildUserCollection(): Collection<User, UserProps> {
    return new Collection<User, UserProps>(
      SERVER_URL, 
      (json: UserProps) => User.buildUser(json));
  }
};