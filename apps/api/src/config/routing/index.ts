import Elysia from "elysia";
import { AuthRouter, UserRouter } from "@/features/user/router";
import { JwtPlugin } from "@/shared/plugins";

const Routes = new Elysia();
Routes.onAfterHandle(({ set }) => {
  set.headers["Content-Type"] = "application/json; charset=utf8";
});
Routes.onError(({ code, error }) => {
  if (code === "NOT_FOUND") return { error: "Route not found :(" };

  const responseError = () => {
    if (error.validator && error.validator.schema) {
      return error.validator.schema;
    } else return error.message;
  };

  return new Response(JSON.stringify({ error: responseError() }));
});

Routes.use(JwtPlugin);
Routes.use(AuthRouter);
Routes.use(UserRouter);

export { Routes };
