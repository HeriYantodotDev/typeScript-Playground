import { Eventing } from "./Eventing";
import axios from "axios";

export class Collection<T, K> {
  models: T[] = [];
  events: Eventing = new Eventing();
  
  constructor(
    public rootURL: string,
    public deserialize: (json: K) => T
    ){}

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  async fetch(): Promise<void> {
    const response = await axios.get(this.rootURL);
    const data: K[] = await response.data;
    for (const value of data) {
      this.models.push(this.deserialize(value));
    }
    this.trigger('change');
  }
}