"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = exports.shorthands = void 0;
exports.shorthands = undefined;
const ADDRESS_TYPE = "address_type";
function up(pgm) {
    pgm.sql(`
        CREATE TYPE ${ADDRESS_TYPE} AS ENUM ('sender', 'client'); 
    `);
}
exports.up = up;
function down(pgm) {
    pgm.sql(`
        DROP TYPE ${ADDRESS_TYPE};
    `);
}
exports.down = down;
