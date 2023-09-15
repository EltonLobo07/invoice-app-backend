"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addAddresses = void 0;
/** Types generated for queries found in "src/queries/addresses.sql" */
const runtime_1 = require("@pgtyped/runtime");
const addAddressesIR = { "usedParamSet": { "addresses": true }, "params": [{ "name": "addresses", "required": false, "transform": { "type": "pick_array_spread", "keys": [{ "name": "invoiceId", "required": false }, { "name": "type", "required": false }, { "name": "street", "required": false }, { "name": "city", "required": false }, { "name": "country", "required": false }, { "name": "postCode", "required": false }] }, "locs": [{ "a": 93, "b": 102 }] }], "statement": "INSERT INTO \n    addresses (invoice_id, \"type\", street, city, country, post_code)\nVALUES\n    :addresses\nRETURNING *" };
/**
 * Query generated from SQL:
 * ```
 * INSERT INTO
 *     addresses (invoice_id, "type", street, city, country, post_code)
 * VALUES
 *     :addresses
 * RETURNING *
 * ```
 */
exports.addAddresses = new runtime_1.PreparedQuery(addAddressesIR);
