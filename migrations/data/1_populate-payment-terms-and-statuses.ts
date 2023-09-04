import "dotenv/config";
import * as pg from "pg";

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL
});

const PAYMENT_TERMS = "payment_terms";
const STATUSES = "statuses";

pool
    .query(`
        INSERT INTO 
            ${PAYMENT_TERMS} (num_days)
        VALUES
            (1),
            (7),
            (14),
            (30); 
    `)
    .then(() => {
        console.log(`Rows added to: ${PAYMENT_TERMS}`);
        return pool.query(`
            INSERT INTO
                ${STATUSES} (type)
            VALUES 
                ('draft'),
                ('paid'),
                ('pending');
        `);
    })
    .then(() => {
        console.log(`Rows added to: ${STATUSES}`);
    })
    .catch(console.log)
    .then(() => pool.end())
    .catch(console.log);
