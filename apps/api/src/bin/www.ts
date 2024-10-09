import { app } from "@/app";
import { Environment } from "@/config/environment";

(() => {
	const PORT = Environment.PORT;
	app.listen(PORT);

	console.log(`app running on port ${PORT}`);

	if (Environment.NODE_ENV) {
		console.log(`running in ${Environment.NODE_ENV} mode`);
	} else {
		console.log(
			"no environment provided on .env file, make sure to set the NODE_ENV variable",
		);
	}
})();
