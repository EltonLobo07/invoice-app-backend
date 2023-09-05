/* eslint-disable @typescript-eslint/naming-convention */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

const PAYMENT_TERMS = "payment_terms";

export function up(pgm: MigrationBuilder) {
    pgm.sql(`
        CREATE TABLE ${PAYMENT_TERMS} (
            id SERIAL PRIMARY KEY,
            num_days INT NOT NULL UNIQUE CHECK (num_days > 0)
        );
    `);
}

export function down(pgm: MigrationBuilder) {
    pgm.sql(`
        DROP TABLE ${PAYMENT_TERMS};
    `);
}
