import type Elysia from "elysia";

export const HealthRouter = (app: Elysia) =>
  app.get("/health", ({ set }) => {
    set.status = "OK";

    return {};
  });
