/* eslint-disable @typescript-eslint/naming-convention */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

const INVOICES = "invoices";

export function up(pgm: MigrationBuilder) {
    pgm.sql(`
        CREATE TABLE ${INVOICES} (
            /*
                The design requirement is to generate a random 6 character string for this field.
                ids may collide. I'll deal with this problem later 
            */
            id SERIAL PRIMARY KEY, 
            frontend_id VARCHAR(6) NOT NULL UNIQUE,
            created_at DATE NOT NULL,
            description VARCHAR(512),
            -- The entry looses its value if payment_term_id is not known, its better to delete the entry
            payment_term_id INT NOT NULL REFERENCES payment_terms(id) ON DELETE CASCADE,
            client_name VARCHAR(320),
            client_email VARCHAR(320),
            -- Same reason as payment_term_id
            status_id INT NOT NULL REFERENCES statuses(id) ON DELETE CASCADE
        );
    `);
}

export function down(pgm: MigrationBuilder) {
    pgm.sql(`
        DROP TABLE ${INVOICES};
    `);
}
