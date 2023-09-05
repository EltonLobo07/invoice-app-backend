/* eslint-disable @typescript-eslint/naming-convention */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

const USERS = "users";

export function up(pgm: MigrationBuilder) {
    pgm.sql(`
        CREATE TABLE ${USERS} (
            id SERIAL PRIMARY KEY,
            name VARCHAR(320) NOT NULL,
            email VARCHAR(320) NOT NULL UNIQUE,
            password_hash VARCHAR(72) NOT NULL
        );
    `);
}

export function down(pgm: MigrationBuilder) {
    pgm.sql(`
        DROP TABLE ${USERS};
    `);
}
