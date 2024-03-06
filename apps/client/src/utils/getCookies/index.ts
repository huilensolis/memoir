import { API_CONFIG } from "@/config/api/api.config";
import { cookies } from "next/headers";

export function getCookie(): { cookie: string | null } {
  try {
    const cookieStore = cookies();

    const cookieInRequest = cookieStore.get(API_CONFIG.cookieName);

    const cookie = `${cookieInRequest?.name}=${cookieInRequest?.value}`;

    return { cookie: cookie ?? null };
  } catch (error) {
    return { cookie: null };
  }
}
