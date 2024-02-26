import Elysia from "elysia";
import { AuthRouter, UserRouter } from "@/features/user/router";
import { JwtPlugin } from "@/shared/plugins";

const Routes = new Elysia();
Routes.onAfterHandle(({ set }) => {
  set.headers["Content-Type"] = "application/json; charset=utf8";
});
Routes.onError(({ code, error, path, set }) => {
  console.log({ path, error, code });

  if (code === "UNKNOWN") {
    set.status = "Unauthorized";
    return {
      error:
        "there is been an error, you may be unauthorized, or there may be another error",
    };
  }

  if (code === "NOT_FOUND") {
    set.status = "Not Found";
    return { error: "Route not found :(" };
  }

  if (code === "VALIDATION") {
    set.status = "Bad Request";
    return new Response(JSON.stringify({ error: error.validator }));
  }

  set.status = "Internal Server Error";
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
