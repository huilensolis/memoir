import { cleanEnv, port, str, url } from "envalid";

export const Environment = cleanEnv(process.env, {
  PORT: port({ default: 3001 }),
  JWT_SECRET: str(),
  API_URL: url({
    desc: "the url of this api server",
  }),
  POSTGRES_USER: str(),
  POSTGRES_DATABASE: str(),
  POSTGRES_PASSWORD: str(),
  NODE_ENV: str({ choices: ["development", "test", "production", "staging"] }),
  ORIGIN: str({
    desc: "the origin of the frontend domain, this is used to configure the cookies origin and the cors origin",
  }),
  DATABASE_URL: str(), // only for production
});
