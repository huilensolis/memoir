export class ApiRoutingService {
  protected static baseUrl = `${process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : process.env.NEXT_PUBLIC_SITE_URL}/api`;

  constructor() {}

  protected static getPath(url: string) {
    return `${this.baseUrl}/${url}`;
  }

  static get routing() {
    return {
      health: this.getPath("health"),
      auth: {
        signUp: this.getPath("auth/sign-up"),
        signIn: this.getPath("auth/sign-in"),
        signOut: this.getPath("auth/sign-out"),
        getUser: this.getPath("user"),
        checkToken: this.getPath("session/token"),
        checkEmailAvailability: (email: string) =>
          this.getPath(`check-availability/email/${email}`),
      },
      entry: {
        createEntry: this.getPath("entry"),
        readEntryById: (entryId: string) => this.getPath(`entry/${entryId}`),
        deleteById: (entryId: string) => this.getPath(`entry/${entryId}`),
        updateEntryById: (entryId: string) => this.getPath(`entry/${entryId}`),
        getEntryList: this.getPath("entry"),
      },
    };
  }
}
