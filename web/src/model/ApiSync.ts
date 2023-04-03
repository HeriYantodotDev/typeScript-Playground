import axios, {AxiosResponse, AxiosPromise} from "axios";

interface HasId {
  id?: number
}

export class ApiSync<T extends HasId> {

  constructor(public rootURL: string ){}

  async fetch(id: number): AxiosPromise {
    return this.getUserId(id);
  };

  private async getUserId(id: number): AxiosPromise {
    return await axios.get(`${this.rootURL}/${id}`);
  };

  async save(data: T): AxiosPromise {
    const { id } = data;
    if (id) {
      const response = await this.putUserData(id, data);
      return response;
    } 
    
    const response = await this.postUserData(data);
    return response;
  };

  private async putUserData(id: number | string, data: T): AxiosPromise {
    const response = await axios.put(`${this.rootURL}/${id}`, data);
    return response;
    //TO DO: setting the current instance with the ID
  };

  private async postUserData(data: T): AxiosPromise {
    const response = await axios.post(this.rootURL, data);
    return response;
    //TO DO: setting the current instance with the ID
  };
}