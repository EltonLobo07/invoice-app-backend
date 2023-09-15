"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = exports.shorthands = void 0;
exports.shorthands = undefined;
const PAYMENT_TERMS = "payment_terms";
function up(pgm) {
    pgm.sql(`
        CREATE TABLE ${PAYMENT_TERMS} (
            id SERIAL PRIMARY KEY,
            num_days INT NOT NULL UNIQUE CHECK (num_days > 0)
        );
    `);
}
exports.up = up;
function down(pgm) {
    pgm.sql(`
        DROP TABLE ${PAYMENT_TERMS};
    `);
}
exports.down = down;
