/* @name getAllInvoicesByUserId */
SELECT 
    * 
FROM 
    result_invoices 
WHERE 
    user_id = :userId
ORDER BY TO_DATE(payment_due, 'YYYY-MM-DD') ASC;

/* @name getInvoiceByUserAndFrontendId */
SELECT * FROM result_invoices WHERE id = :frontendId AND user_id = :userId;

/* @name addInvoice */
INSERT INTO
    invoices (frontend_id, created_at, "description", payment_term_id, client_name, client_email, status_id, user_id)
VALUES
    (:frontendId, :createdAt, :description, :paymentTermId, :clientName, :clientEmail, :statusId, :userId)
RETURNING *;

/* @name deleteInvoiceByUserAndFrontendId */
DELETE FROM
    invoices
WHERE 
    frontend_id = :frontendId
    AND 
    user_id = :userId
RETURNING *;
