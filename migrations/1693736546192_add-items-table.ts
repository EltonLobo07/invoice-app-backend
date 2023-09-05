/* eslint-disable @typescript-eslint/naming-convention */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

const ITEMS = "items";

export function up(pgm: MigrationBuilder) {
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

export function down(pgm: MigrationBuilder) {
    pgm.sql(`
        DROP TABLE ${ITEMS};
    `);
}
