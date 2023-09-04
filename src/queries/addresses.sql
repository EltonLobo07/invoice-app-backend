/* 
    @name addAddresses
    @param addresses -> ((invoiceId, type, street, city, country, postCode)...) 
*/
INSERT INTO 
    addresses (invoice_id, "type", street, city, country, post_code)
VALUES
    :addresses
RETURNING *;
