import { Callback } from "./Eventing";
import { AxiosPromise, AxiosResponse } from "axios";

interface ModelAttributes<T> {
  set(value: T): void,
  getAllData(): T,
  get<K extends keyof T>(key: K): T[K]
}

interface Sync<T> {
  fetch(id: number): AxiosPromise,
  save(data:T): AxiosPromise
}

interface Events {
  on(eventName: string , callback:Callback): void,
  trigger(eventName: string): void
}

interface HasId {
  id?: number;
}

export class Model<T extends HasId> {
  constructor(
    private attributes: ModelAttributes<T>,
    private events: Events,
    private sync: Sync<T>
  ) {}

  on = this.events.on;
  // get on () {
  //   return this.events.on;
  // };

  trigger = this.events.trigger;
  // get trigger() {
  //   return this.events.trigger;
  // };

  get = this.attributes.get;
  // get get() {
  //   return this.attributes.get;
  // }

  getAllData = this.attributes.getAllData;
  // get getAllData() {
  //   return this.attributes.getAllData;
  // }

  set(update: T): void {
    this.attributes.set(update);
    this.events.trigger('change');
  }

  async fetch(): Promise<void> {
    const id = this.get('id');

    if (typeof id !== 'number') {
      throw new Error('Cannot fetch without an id');
    }

    const response = await this.sync.fetch(id);
    this.set(response.data);
  }

  async save(): Promise<void> {
    try {
      const response: AxiosResponse<T> = (await this.sync.save(this.attributes.getAllData()));
      this.trigger('save');
      this.set(response.data);
    }
    catch(err) {
      this.trigger('error');
    };
  };
}