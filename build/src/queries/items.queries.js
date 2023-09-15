"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addItems = void 0;
/** Types generated for queries found in "src/queries/items.sql" */
const runtime_1 = require("@pgtyped/runtime");
const addItemsIR = { "usedParamSet": { "items": true }, "params": [{ "name": "items", "required": false, "transform": { "type": "pick_array_spread", "keys": [{ "name": "invoiceId", "required": false }, { "name": "name", "required": false }, { "name": "price", "required": false }, { "name": "quantity", "required": false }, { "name": "arrIndex", "required": false }] }, "locs": [{ "a": 84, "b": 89 }] }], "statement": "INSERT INTO\n    items (invoice_id, \"name\", price, quantity, arr_index) \nVALUES \n    :items\nRETURNING *" };
/**
 * Query generated from SQL:
 * ```
 * INSERT INTO
 *     items (invoice_id, "name", price, quantity, arr_index)
 * VALUES
 *     :items
 * RETURNING *
 * ```
 */
exports.addItems = new runtime_1.PreparedQuery(addItemsIR);
