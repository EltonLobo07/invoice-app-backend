/* eslint-disable @typescript-eslint/naming-convention */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

const ADDRESSES = "addresses";

export function up(pgm: MigrationBuilder) {
    pgm.sql(`
        /*
            The whole purpose of this table is to act like a custom type for the "invoices" table entities
            as I don't want to create a custom type offered by PostgreSQL just yet.
            I am aware of this approach being very bad but it will help me shift focus on high priority
            important parts of the application quickly
        */
        CREATE TABLE ${ADDRESSES} (
            invoice_id VARCHAR(6) NOT NULL REFERENCES invoices(id) ON DELETE CASCADE, 
            type address_type NOT NULL,
            street VARCHAR(512),
            city VARCHAR(320),
            state VARCHAR(320),
            country VARCHAR(320),
            zip_code VARCHAR(128)
        );
    `);
}

export function down(pgm: MigrationBuilder) {
    pgm.sql(`
        DROP TABLE ${ADDRESSES};
    `);
}
