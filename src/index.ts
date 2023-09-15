import "dotenv/config";
import { appBuilder } from "./app-builder";
import { pool } from "./pool";
import { beforeShutdown } from "./safe-shutdown";
import * as http from "http";
import { helpers } from "./helpers";

const PORT = 3000;

const app = appBuilder();

let server: http.Server | null = null;

pool
    .query("SELECT 1 + 1")
    .then(() => {
        server = app.listen(process.env.PORT || PORT, () => {
            console.log(`Server running on PORT: ${PORT}`);
        });
    })
    .catch(console.log);

beforeShutdown(() => {
    helpers.logger("Closing express server");
    server?.closeAllConnections();
});
beforeShutdown(() => {
    helpers.logger("Closing database connection");
    return pool.end();
});
