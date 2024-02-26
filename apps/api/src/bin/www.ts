import { Environment } from "@/config/environment";
import { app } from "../app";

(() => {
  const port = Environment.PORT;
  app.listen(port);
  console.log(`app running on port ${port}`);
})();
