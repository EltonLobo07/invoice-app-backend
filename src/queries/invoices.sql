/* @name getAllInvoices */
SELECT * FROM result_invoices;

/* @name getInvoiceByFrontendId */
SELECT * FROM result_invoices WHERE id = :frontendId;

/* @name addInvoice */
INSERT INTO
    invoices (frontend_id, created_at, "description", payment_term_id, client_name, client_email, status_id)
VALUES
    (:frontendId, :createdAt, :description, :paymentTermId, :clientName, :clientEmail, :statusId)
RETURNING *;

/* @name deleteInvoiceByFrontendId */
DELETE FROM
    invoices
WHERE 
    frontend_id = :frontendId
RETURNING *;
