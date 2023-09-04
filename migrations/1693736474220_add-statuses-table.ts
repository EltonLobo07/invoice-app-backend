/* eslint-disable @typescript-eslint/naming-convention */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

const STATUSES = "statuses";

export function up(pgm: MigrationBuilder) {
    pgm.sql(`
        CREATE TABLE ${STATUSES} (
            id SERIAL PRIMARY KEY,
            type VARCHAR(8) NOT NULL UNIQUE
        );
    `);
}

export function down(pgm: MigrationBuilder) {
    pgm.sql(`
        DROP TABLE ${STATUSES};
    `);
}
