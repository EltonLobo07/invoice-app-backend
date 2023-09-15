"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = exports.shorthands = void 0;
exports.shorthands = undefined;
const ITEMS = "items";
function up(pgm) {
    pgm.sql(`
        /*
            The whole purpose of this table is to act like a custom type for the "invoices" table
            as I don't want to create a custom type offered by PostgreSQL just yet.
            I am aware of this approach being very bad but it will help me shift focus on high priority
            important parts of the application quickly
        */
        CREATE TABLE ${ITEMS} (
            invoice_id INT NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
            name VARCHAR(320),
            price NUMERIC,
            arr_index INT NOT NULL,
            quantity INT CHECK (quantity > 0),
            UNIQUE (invoice_id, arr_index)
        ); 
    `);
}
exports.up = up;
function down(pgm) {
    pgm.sql(`
        DROP TABLE ${ITEMS};
    `);
}
exports.down = down;
