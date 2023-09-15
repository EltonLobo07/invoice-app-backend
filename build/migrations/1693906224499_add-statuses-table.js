"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = exports.shorthands = void 0;
exports.shorthands = undefined;
const STATUSES = "statuses";
function up(pgm) {
    pgm.sql(`
        CREATE TABLE ${STATUSES} (
            id SERIAL PRIMARY KEY,
            type VARCHAR(8) NOT NULL UNIQUE
        );
    `);
}
exports.up = up;
function down(pgm) {
    pgm.sql(`
        DROP TABLE ${STATUSES};
    `);
}
exports.down = down;
