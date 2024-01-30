export class ClientRoutingService {
  cosntructor() {}

  get auth() {
    return { signUp: "/auth/sign-up", signIn: "/auth/sign-in" };
  }

  get app() {
    return {
      home: "/app",
    };
  }
}
