import { Hono } from "onlykit/server";
import { chalk } from "onlykit/cli";
import { serve } from "onlykit/server/node";

//#region src/server/index.ts
const app = new Hono();
app.get("/", (c) => c.text("Hello, World!"));
serve(app, (info) => {
	const port = info.port;
	const message = chalk.green("Server is running at " + chalk.bold(`http://localhost:${port}`));
	console.log(message);
});

//#endregion
export {  };