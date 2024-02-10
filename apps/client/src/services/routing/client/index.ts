export class ClientRoutingService {
  cosntructor() {}

  public static get auth() {
    return { signUp: "/auth/sign-up", signIn: "/auth/sign-in" };
  }

  public static get app() {
    return {
      home: "/app",
    };
  }
}
