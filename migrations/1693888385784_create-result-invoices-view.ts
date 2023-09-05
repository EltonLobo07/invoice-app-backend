/* eslint-disable @typescript-eslint/naming-convention */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

const VIEW_NAME = "result_invoices";

export function up(pgm: MigrationBuilder) {
    pgm.sql(`
        CREATE VIEW ${VIEW_NAME} AS (
            SELECT 
            invoices.frontend_id AS id,
            TO_CHAR(
                invoices.created_at, 
                'YYYY-MM-DD'
            ) AS created_at,
            TO_CHAR(
                invoices.created_at + payment_terms.num_days, 
                'YYYY-MM-DD'
            ) AS payment_due,
            invoices.description,
            payment_terms.num_days AS payment_terms,
            invoices.client_name AS client_name,
            invoices.client_email AS client_email,
            statuses.type AS "status",
            JSON_BUILD_OBJECT(
                'street', sender_addrs.street, 
                'city', sender_addrs.city, 
                'post_code', sender_addrs.post_code, 
                'country', sender_addrs.country
            ) AS sender_address,
            JSON_BUILD_OBJECT(
                'street', client_addrs.street, 
                'city', client_addrs.city, 
                'post_code', client_addrs.post_code, 
                'country', client_addrs.country
            ) AS client_address,
            items.items
            FROM 
                invoices
            JOIN 
                payment_terms 
                ON 
                    payment_terms.id = invoices.payment_term_id
            JOIN
                statuses 
                ON 
                    statuses.id = invoices.status_id
            JOIN 
                addresses sender_addrs 
                ON 
                    sender_addrs.invoice_id = invoices.id 
                    AND 
                    sender_addrs.type = 'sender'
            JOIN
                addresses client_addrs 
                ON 
                    client_addrs.invoice_id = invoices.id 
                    AND 
                    client_addrs.type = 'client'
            JOIN (
                SELECT 
                    invoice_id, 
                    ARRAY_AGG(
                        JSON_BUILD_OBJECT(
                            'name', items.name, 
                            'quantity', items.quantity, 
                            'price', items.price, 
                            'total', ROUND(items.price * items.quantity, 2)
                        )
                        ORDER BY items.arr_index ASC
                    ) AS items
                FROM
                    items
                GROUP BY 
                    items.invoice_id
            ) AS items ON items.invoice_id = invoices.id
        );
    `);
}

export function down(pgm: MigrationBuilder) {
    pgm.sql(`
        DROP VIEW ${VIEW_NAME};
    `);
}
