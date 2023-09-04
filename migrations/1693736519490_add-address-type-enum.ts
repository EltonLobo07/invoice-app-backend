/* eslint-disable @typescript-eslint/naming-convention */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

const ADDRESS_TYPE = "address_type";

export function up(pgm: MigrationBuilder) {
    pgm.sql(`
        CREATE TYPE ${ADDRESS_TYPE} AS ENUM ('sender', 'client'); 
    `);
}

export function down(pgm: MigrationBuilder) {
    pgm.sql(`
        DROP TABLE ${ADDRESS_TYPE};
    `);
}
