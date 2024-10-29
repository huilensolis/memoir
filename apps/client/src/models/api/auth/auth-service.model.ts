import { ApiRoutingService } from "@/models/routing/api";
import { ApiService } from "..";
import { API_CONFIG } from "@/config/api/api.config";
import { type User } from "@/types/user";
import axios from "axios";

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
            const { status } = await axios.post(
                ApiRoutingService.routing.auth.signUp,
                { email, password, name },
            );

            if (status !== 201) {
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
            const { status } = await axios.post(
                ApiRoutingService.routing.auth.signIn,
                { email, password },
            );

            if (status !== 202) {
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
            const { status } = await axios.get(
                ApiRoutingService.routing.auth.signOut,
            );

            if (status !== 201) throw new Error();
        } catch (error) {
            throw new Error("error singing out");
        }
    }

    /*
     * @param cookies: string
     * sets the cookies explicitly on the request.
     * this is not necesary on the client side,
     * as the cookeis are sent by the browser
     */
    public static async checkToken({ cookies }: { cookies?: string }): Promise<{
        isTokenValid: boolean;
    }> {
        try {
            const res = await fetch(ApiRoutingService.routing.auth.checkToken, {
                headers: {
                    ...(cookies && { Cookie: `${API_CONFIG.cookieName}=${cookies}` }),
                    "Content-Type": "application/json; utf-8",
                },
                signal: AbortSignal.timeout(4000),
            });

            if (res.status !== 202) {
                throw new Error(
                    "there is been an error on the check token request request response",
                );
            }

            return { isTokenValid: true };
        } catch (error) {
            return { isTokenValid: false };
        }
    }

    public static async checkEmail({
        email,
    }: {
        email: string;
    }): Promise<{ isEmailAvailable: boolean }> {
        try {
            const { status } = await axios.get(
                ApiRoutingService.routing.auth.checkEmailAvailability(email),
            );

            if (status !== 200) throw new Error();

            return { isEmailAvailable: true };
        } catch (error) {
            return { isEmailAvailable: false };
        }
    }

    public static async getUser({
        Cookie = undefined,
        signal = undefined,
    }: {
        Cookie?: string;
        signal?: AbortSignal;
    }): Promise<{ user: User | null }> {
        try {
            const { data: user, status } = await axios.get<User>(
                ApiRoutingService.routing.auth.getUser,
                { headers: { ...(Cookie && { Cookie }) }, ...(signal && { signal }) },
            );

            if (!user || status !== 200) throw new Error("error getting user");

            return { user };
        } catch (error) {
            return { user: null };
        }
    }
}
