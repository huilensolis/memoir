export class ClientRoutingService {
    cosntructor() { }

    public static get auth() {
        return { signUp: "/auth/sign-up", signIn: "/auth/sign-in" };
    }

    public static get app() {
        const entries = {
            readById: (entryId: string) => `/app/entry/${entryId}`,
            create: "/app/entry/new",
        };

        const keys = {
            home: "/app/key/",
            generate: "/app/key/gen/",
            input: "/app/key/input/"
        };

        return {
            home: "/app",
            entries,
            keys,
        };
    }
}
