import Elysia from "elysia";
import { AuthRouter, UserRouter } from "@/features/user/router";
import { JwtPlugin } from "@/shared/plugins";

const Routes = new Elysia();
Routes.onAfterHandle(({ set }) => {
  set.headers["Content-Type"] = "application/json; charset=utf8";
});
Routes.onError(({ code, error }) => {
  if (code === "NOT_FOUND") return "Route not found :(";

  return new Response(error.toString());
});

Routes.use(JwtPlugin);
Routes.use(AuthRouter);
Routes.use(UserRouter);

export { Routes };
