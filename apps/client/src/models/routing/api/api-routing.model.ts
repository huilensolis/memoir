export class ApiRoutingService {
  protected static baseUrl =
    process.env.API_URL || "https://localhost:3001/api";

  constructor() {}

  protected static getPath(url: string) {
    return `${this.baseUrl}/${url}`;
  }

  static get routing() {
    return {
      auth: {
        signUp: this.getPath("auth/sign-up"),
        signIn: this.getPath("auth/sign-in"),
        signOut: this.getPath("auth/sign-out"),
        checkToken: this.getPath("auth/token"),
      },
    };
  }
}
