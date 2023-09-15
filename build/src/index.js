"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const app_builder_1 = require("./app-builder");
const pool_1 = require("./pool");
const safe_shutdown_1 = require("./safe-shutdown");
const helpers_1 = require("./helpers");
const PORT = 3000;
const app = (0, app_builder_1.appBuilder)();
let server = null;
pool_1.pool
    .query("SELECT 1 + 1")
    .then(() => {
    server = app.listen(process.env.PORT || PORT, () => {
        console.log(`Server running on PORT: ${PORT}`);
    });
})
    .catch(console.log);
(0, safe_shutdown_1.beforeShutdown)(() => {
    helpers_1.helpers.logger("Closing express server");
    server === null || server === void 0 ? void 0 : server.closeAllConnections();
});
(0, safe_shutdown_1.beforeShutdown)(() => {
    helpers_1.helpers.logger("Closing database connection");
    return pool_1.pool.end();
});
