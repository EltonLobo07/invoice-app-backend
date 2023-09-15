import "dotenv/config";
import * as pg from "pg";
import bcrypt from "bcrypt";

const NAME = "Guest User";
const PASSWORD = "guest@123";

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL
});

bcrypt
    .hash(PASSWORD, 10)
    .then(passwordHash => pool.query(`
        INSERT INTO users (
            "name",
            email,
            password_hash
        ) VALUES (
            '${NAME}',
            '${NAME.split(" ").join(".").toLowerCase() + "@gmail.com"}',
            '${passwordHash}'
        );
    `))
    .catch(console.log)
    .then(() => pool.end())
    .catch(console.log);
