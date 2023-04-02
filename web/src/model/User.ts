import axios from "axios";
import { AxiosResponse } from "axios";
import { Eventing } from "./Eventing";
import { Sync } from "./Sync";
import { Attributes } from "./Attributes";

export interface UserProps {
  [key: string]: string | number | undefined;
  id?: number;
  name?: string,
  age?: number
};

export class User {

  private SERVER_URL: string = 'http://localhost:3000/users';
  
  public events: Eventing = new Eventing();

  public sync: Sync<UserProps> = new Sync<UserProps>(this.SERVER_URL);

  public attributes: Attributes<UserProps>;

  constructor(attrs: UserProps) {
    this.attributes = new Attributes<UserProps>(attrs);
  } 

};