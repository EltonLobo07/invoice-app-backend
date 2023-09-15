"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = exports.shorthands = void 0;
exports.shorthands = undefined;
const INVOICES = "invoices";
function up(pgm) {
    pgm.sql(`
        CREATE TABLE ${INVOICES} (
            /*
                The design requirement is to generate a random 6 character string for this field.
                ids may collide. I'll deal with this problem later 
            */
            id SERIAL PRIMARY KEY, 
            frontend_id VARCHAR(6) NOT NULL UNIQUE,
            user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
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
exports.up = up;
function down(pgm) {
    pgm.sql(`
        DROP TABLE ${INVOICES};
    `);
}
exports.down = down;
