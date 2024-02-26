export class Environment {
  public static port = process.env.PORT || 3000;
  public static jwtSecret = process.env.JWT_SECRET || "secret";
  public static apiUrl = `http://localhost:${this.port}`;

  public static databaseCredentials = {
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  };
  constructor() {}
}
