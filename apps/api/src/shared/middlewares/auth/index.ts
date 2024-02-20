import Elysia from "elysia";
import { JwtPlugin } from "../../plugins";
import { SafeUser } from "@/features/user/models/user.model";
import { UserAdapter } from "@/features/user/adapters";
import { UserProvider } from "@/features/user/provider/manage";

export const isAuthenticated = new Elysia()
  .use(JwtPlugin)
  .derive(async ({ jwt, cookie, set }): Promise<{ user: SafeUser }> => {
    try {
      if (!cookie || !cookie.access_token)
        throw new Error("no token found on cookies");

      const { access_token } = cookie;

      const tokenPayload = await jwt.verify(access_token);

      if (tokenPayload === false) throw new Error("could not verify jwt");

      const { user, exp } = tokenPayload;

      if (!exp) throw new Error("no exp date found in token");

      if (exp - new Date().getTime() <= 0) throw new Error("jwt expired");

      if (!user) throw new Error("not user found");

      const { data, error } = await UserProvider.getById({
        userId: user.id,
      });

      if (error || !data || !data.user) throw new Error("could not fetch user");

      const { user: userFromDb } = data;

      if (user.email !== userFromDb.email)
        throw new Error("user email doesnt match");

      const { user: safeUser } = UserAdapter.toSafeUser({ user: userFromDb });

      return { user: safeUser };
    } catch (error) {
      set.status = "Unauthorized";
      set.headers = { "Content-Type": "application/json; utf8;" };
      throw new Error("unauthorized");
    }
  });
