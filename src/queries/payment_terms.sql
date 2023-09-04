/* @name findPaymentTermByNumDays */
SELECT 
    * 
FROM
    payment_terms
WHERE 
    num_days = :numDays;
