export class ApiRoutingService {
  protected static baseUrl = "http://localhost:3000";

  constructor() {}

  protected static getPath(url: string) {
    return `${this.baseUrl}/${url}`;
  }

  static get routing() {
    return {
      auth: {
        signUp: this.getPath("auth/sign-up"),
        signIn: this.getPath("auth/sign-in"),
      },
    };
  }
}
