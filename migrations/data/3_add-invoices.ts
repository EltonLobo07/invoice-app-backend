import "dotenv/config";
import * as pg from "pg";
import fs from "fs/promises";
import { helpers } from "../../src/helpers";
import { invoiceRouterAddInvoice } from "../../src/routes/invoices";

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL
});

(async () => {
    try {
        const invoices: unknown = JSON.parse(await fs.readFile(`${process.cwd()}/migrations/data/invoices.json`, "utf-8"));
        if (!Array.isArray(invoices)) {
            throw new Error("invoices should be an array");
        }
        for (const invoice of invoices) {
            await helpers.useTransaction(
                pool,
                (client => invoiceRouterAddInvoice({
                    client,
                    reqBody: invoice,
                    userId: 1 
                })) 
            );
        }
        console.log("Invoices added successfully");
    }
    catch(error) {
        console.log(error);
    }
    return pool.end();
})()
    .catch(console.log);
