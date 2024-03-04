import { Environment } from "@/config/environment";
import { app } from "../app";

(() => {
  const port = Environment.PORT;
  app.listen(port);

  console.log(`app running on port ${port}`);

  if (Environment.NODE_ENV) {
    console.log(`running in ${Environment.NODE_ENV} mode`);
  } else {
    console.log(
      "no environment provided on .env file, make sure to set the NODE_ENV variable",
    );
  }
})();
