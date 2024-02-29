import { AuthService } from "@/models/api/auth";
import { getCookie } from "@/utils/getCookies";

export async function ProfileCard() {
  const { cookie } = getCookie();

  if (!cookie) {
    return <span>there is been an error trying to get the session</span>;
  }

  const { user } = await AuthService.getUser({ Cookie: cookie });

  return (
    <>
      {user ? (
        <article className="w-full flex gap-2 items-center p-1 font-bold text-neutral-800 rounded-md">
          <img
            src={`https://avatar.vercel.sh/${user.name}`}
            alt="profile gradient avatar"
            className="h-12 w-12 rounded-full"
          />
          <section className="flex flex-col justify-center">
            <h4 className="">{user.name}</h4>
            <span className="font-semibold text-sm text-neutral-500">
              {user.email}
            </span>
          </section>
        </article>
      ) : (
        <span>there is been an error trying to load the user</span>
      )}
    </>
  );
}
