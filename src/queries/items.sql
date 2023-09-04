/* 
    @name addItems
    @param items -> ((invoiceId, name, price, quantity)...)
*/
INSERT INTO
    items (invoice_id, "name", price, quantity) 
VALUES 
    :items
RETURNING *;
