import { ApiRoutingService } from "@/models/routing/api";
import { ApiService } from "..";

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
  }): Promise<{ token: string | null; error: Error | null }> {
    try {
      const { data, error } = await this.fetcher().post<{ token: string }>({
        url: ApiRoutingService.routing.auth.signUp,
        body: { email, password, name },
      });

      if (!data || !data.token || error) {
        throw new Error(
          "there is been an error on the sign up request response",
        );
      }

      return { error: null, token: data.token };
    } catch (error) {
      return { token: null, error: error as Error };
    }
  }
  public static async signIn({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<{ token: string | null; error: Error | null }> {
    try {
      const { data, error } = await this.fetcher().post<{ token: string }>({
        url: ApiRoutingService.routing.auth.signIn,
        body: { email, password },
      });

      if (!data || !data.token || error) {
        throw new Error(
          "there is been an error on the sign up request response",
        );
      }

      return { error: null, token: data.token };
    } catch (error) {
      return { token: null, error: error as Error };
    }
  }

  public static async signOut() {
    try {
      const { error } = await this.fetcher().get<{}>({
        url: ApiRoutingService.routing.auth.signOut,
      });

      if (error) throw new Error("error singing out");

      return Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  }

  public static async checkToken({
    cookies = "",
  }: {
    cookies?: string;
  }): Promise<{
    isTokenValid: boolean;
  }> {
    try {
      const { error } = await this.fetcher().get<{}>({
        url: ApiRoutingService.routing.auth.checkToken,
        headers: cookies ? { Cookie: cookies } : {},
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
}
