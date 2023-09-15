"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = exports.shorthands = void 0;
exports.shorthands = undefined;
const ADDRESSES = "addresses";
function up(pgm) {
    pgm.sql(`
        /*
            The whole purpose of this table is to act like a custom type for the "invoices" table entities
            as I don't want to create a custom type offered by PostgreSQL just yet.
            I am aware of this approach being very bad but it will help me shift focus on high priority
            important parts of the application quickly
        */
        CREATE TABLE ${ADDRESSES} (
            invoice_id INT NOT NULL REFERENCES invoices(id) ON DELETE CASCADE, 
            type address_type NOT NULL,
            street VARCHAR(512),
            city VARCHAR(320),
            country VARCHAR(320),
            post_code VARCHAR(128)
        );
    `);
}
exports.up = up;
function down(pgm) {
    pgm.sql(`
        DROP TABLE ${ADDRESSES};
    `);
}
exports.down = down;
