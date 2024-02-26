import { cleanEnv, port, str, url } from "envalid";

export const Environment = cleanEnv(process.env, {
  PORT: port({ default: 3001 }),
  JWT_SECRET: str(),
  API_URL: url({
    default: `http://localhost:${process.env.PORT}`,
    desc: "the url of this api server",
  }),
  POSTGRES_USER: str(),
  POSTGRES_DATABASE: str(),
  POSTGRES_PASSWORD: str(),
});
