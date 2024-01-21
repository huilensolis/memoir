import Elysia from "elysia";
import { UserController } from "../controller";

export const UserRouter = new Elysia()
  .group("/auth", (app) =>
    app
      .post("/sign-up", UserController.auth.signUp)
      .post("/sign-in", UserController.auth.signIn),
  )
  .group("/manage", (app) =>
    app
      .put("/update/:userId", UserController.manage.updateController)
      .put("/delete/:userId", UserController.manage.deleteController),
  );
