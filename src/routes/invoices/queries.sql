/* @name getAllInvoices */
SELECT 
    invoices.id,
    invoices.created_at,
    invoices.description,
    payment_terms.num_days AS payment_terms,
    invoices.client_name,
    invoices.client_email,
    statuses.type AS status_type,
    items.name AS item_name,
    items.price AS item_price,
    items.quantity AS item_quantity,
    items.price * items.quantity AS item_total
FROM 
    invoices
JOIN 
    payment_terms ON payment_terms.id = invoices.payment_term_id
JOIN
    statuses ON statuses.id = invoices.status_id
LEFT JOIN
    items ON items.invoice_id = invoices.id;

/* @name addInvoice */
INSERT INTO
    invoices 
VALUES 
    (:id, :createdAt, :description, :paymentTermId, :clientName, :clientEmail, :statusId);
