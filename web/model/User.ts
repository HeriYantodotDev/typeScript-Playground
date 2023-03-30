interface UserProps {
  [key: string]: string | number | undefined;
  name?: string,
  age?: number
};

type Callback = () => {};

export class User {
  constructor(private data: UserProps){};

  get(propName: string): (string | number | undefined) {
    return this.data[propName]
  };

  set(update: UserProps): void {
    Object.assign(this.data, update);
  };

  on(eventName: string, callback: Callback) {
    
  };


};