import Elysia from "elysia";
import { JwtPlugin } from "../../plugins";
import { UserProvider } from "@/features/user/provider";
import { SafeUser } from "@/features/user/models/user.model";

export const isAuthenticated = new Elysia()
  .use(JwtPlugin)
  .derive(async ({ jwt, cookie, set }): Promise<{ user: SafeUser }> => {
    try {
      if (!cookie || !cookie.access_token)
        throw new Error("no token found on cookies");

      const { access_token } = cookie;

      const tokenPayload = await jwt.verify(access_token);

      if (tokenPayload === false) throw new Error("could not verify jwt");

      const { user } = tokenPayload;

      if (!user) throw new Error("not user found");

      const { data, error } = await UserProvider.manage.get({
        userId: user.id,
      });

      if (error || !data || !data.user) throw new Error("could not fetch user");

      const { user: userFromDb } = data;

      if (user.email !== userFromDb.email)
        throw new Error("user email doesnt match");

      return { user };
    } catch (error) {
      console.log(error);

      set.status = "Unauthorized";
      throw new Error("unauthorized");
    }
  });