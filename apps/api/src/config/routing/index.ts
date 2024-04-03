import Elysia, { error } from "elysia";
import { AuthRouter, UserRouter } from "@/features/user/router";
import { JournalEntryRoutes } from "@/features/journal-entry/router/";

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
      console.log(e);
      return error("Internal Server Error", {});
  }
});

Routes.use(AuthRouter);
Routes.use(UserRouter);
Routes.use(JournalEntryRoutes);

export { Routes };
