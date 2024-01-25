import { app } from "../app";
import { environment } from "../config/database/env-variables";

(() => {
  const port = environment.port;
  app.listen(port);
  console.log(`app running on port ${port}`);
})();
