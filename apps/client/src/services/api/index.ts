import { Fetcher } from "../fetcher";

export class ApiService extends Fetcher {
  protected baseUrl: string;

  constructor() {
    super();
    this.baseUrl = "http://localhost:3000";
  }
}
