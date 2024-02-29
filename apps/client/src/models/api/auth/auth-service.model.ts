import { ApiRoutingService } from "@/models/routing/api";
import { ApiService } from "..";
import { API_CONFIG } from "@/config/api/api.config";
import { type User } from "@/types/user";

export class AuthService extends ApiService {
  constructor() {
    super();
  }

  public static async signUp({
    email,
    password,
    name,
  }: {
    email: string;
    password: string;
    name: string;
  }): Promise<{ error: Error | null }> {
    try {
      const { error } = await this.fetcher().post<null>({
        url: ApiRoutingService.routing.auth.signUp,
        body: { email, password, name },
      });

      if (error) {
        throw new Error(
          "there is been an error on the sign up request response",
        );
      }

      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  }

  public static async signIn({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<{ error: Error | null }> {
    try {
      const { error } = await this.fetcher().post<null>({
        url: ApiRoutingService.routing.auth.signIn,
        body: { email, password },
      });

      if (error) {
        throw new Error(
          "there is been an error on the sign up request response",
        );
      }

      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  }

  public static async signOut() {
    try {
      const { error } = await this.fetcher().get<null>({
        url: ApiRoutingService.routing.auth.signOut,
      });

      if (error) throw new Error("error singing out");
    } catch (error) {
      throw new Error("error singing out");
    }
  }

  /*
   *@param cookies: string
   * sets the cookies explicitly on the request.
   * this is not necesary on the client side,
   * as the cookeis are sent by the browser
   */
  public static async checkToken({
    cookies = "",
  }: {
    cookies?: string;
  }): Promise<{
    isTokenValid: boolean;
  }> {
    try {
      const { error } = await this.fetcher().get<null>({
        url: ApiRoutingService.routing.auth.checkToken,
        headers: cookies
          ? { Cookie: `${API_CONFIG.cookieName}=${cookies}` }
          : {},
      });

      if (error) {
        throw new Error(
          "there is been an error on the check token request request response",
        );
      }

      return { isTokenValid: true };
    } catch (error) {
      return { isTokenValid: false };
    }
  }

  public static async getUser({
    Cookie = null,
  }: {
    Cookie?: string;
  }): Promise<{ user: User | null }> {
    try {
      const { error, data } = await this.fetcher().get<{ user: User }>({
        url: ApiRoutingService.routing.auth.getUser,
        headers: Cookie ? { Cookie } : {},
      });

      if (error ?? !data) throw new Error("error getting user");

      const { user } = data;

      if (!user) throw new Error("user not found in response json");

      return { user };
    } catch (error) {
      return { user: null };
    }
  }
}
