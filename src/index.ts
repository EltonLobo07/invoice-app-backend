import "dotenv/config";
import { appBuilder } from "./app-builder";
import { pool } from "./pool";

const PORT = 3000;

pool
    .query("SELECT 1 + 1")
    .then(() => {
        appBuilder().listen(PORT, () => {
            console.log(`App binding to PORT: ${PORT}`);
        });
    })
    .catch(console.log);
