/* 
    @name addItems
    @param items -> ((invoiceId, name, price, quantity, arrIndex)...)
*/
INSERT INTO
    items (invoice_id, "name", price, quantity, arr_index) 
VALUES 
    :items
RETURNING *;
