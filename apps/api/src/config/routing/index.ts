import Elysia from "elysia";
import { AuthRouter, UserRouter } from "@/features/user/router";
import { JwtPlugin } from "@/shared/plugins";

const Routes = new Elysia();
Routes.onAfterHandle(({ set }) => {
  set.headers["Content-Type"] = "application/json; charset=utf8";
});
Routes.onError(({ code, error, path }) => {
  console.log({ path });

  if (code === "NOT_FOUND") return { error: "Route not found :(" };

  if (code == "VALIDATION")
    return new Response(JSON.stringify({ error: error.validator }));

  return new Response(
    JSON.stringify({
      error: error.message,
    }),
  );
});

Routes.use(JwtPlugin);
Routes.use(AuthRouter);
Routes.use(UserRouter);

export { Routes };
