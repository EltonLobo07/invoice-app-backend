"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = exports.shorthands = void 0;
exports.shorthands = undefined;
const USERS = "users";
function up(pgm) {
    pgm.sql(`
        CREATE TABLE ${USERS} (
            id SERIAL PRIMARY KEY,
            name VARCHAR(320) NOT NULL,
            email VARCHAR(320) NOT NULL UNIQUE,
            password_hash VARCHAR(72) NOT NULL
        );
    `);
}
exports.up = up;
function down(pgm) {
    pgm.sql(`
        DROP TABLE ${USERS};
    `);
}
exports.down = down;
