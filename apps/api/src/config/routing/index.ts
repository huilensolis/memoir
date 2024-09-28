import { EntryRoutes } from "@/features/entry/router/";
import { HealthRouter } from "@/features/health/router";
import { AuthRouter, UserRouter } from "@/features/user/router";
import Elysia, { error } from "elysia";

const Routes = new Elysia();

Routes.onAfterHandle(({ set }) => {
  set.headers["Content-Type"] = "application/json; charset=utf8";
});

Routes.onError(({ code, error: e }) => {
  switch (code) {
    case "PARSE":
      return error("Bad Request", { error: "error parsing body" });
    case "NOT_FOUND":
      return error("Not Implemented", { error: "Route not found :(" });
    case "VALIDATION":
      return error("Bad Request", { error: e.validator });
    default:
      return error("Internal Server Error", {});
  }
});

Routes.use(HealthRouter);
Routes.use(AuthRouter);
Routes.use(UserRouter);
Routes.use(EntryRoutes);

export { Routes };
