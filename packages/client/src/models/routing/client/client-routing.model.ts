export class ClientRoutingService {
  cosntructor() {}

  public static get auth() {
    return { signUp: "/auth/sign-up", signIn: "/auth/sign-in" };
  }

  public static get app() {
    const entries = {
      readById: (entryId: string) => `/app/entry/${entryId}`,
      create: "/app/entry/new",
    };

    return {
      home: "/app",
      entries,
    };
  }
}
