"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteInvoiceByUserAndFrontendId = exports.addInvoice = exports.getInvoiceByUserAndFrontendId = exports.getAllInvoicesByUserId = void 0;
/** Types generated for queries found in "src/queries/invoices.sql" */
const runtime_1 = require("@pgtyped/runtime");
const getAllInvoicesByUserIdIR = { "usedParamSet": { "userId": true }, "params": [{ "name": "userId", "required": false, "transform": { "type": "scalar" }, "locs": [{ "a": 63, "b": 69 }] }], "statement": "SELECT \n    * \nFROM \n    result_invoices \nWHERE \n    user_id = :userId\nORDER BY TO_DATE(payment_due, 'YYYY-MM-DD') ASC" };
/**
 * Query generated from SQL:
 * ```
 * SELECT
 *     *
 * FROM
 *     result_invoices
 * WHERE
 *     user_id = :userId
 * ORDER BY TO_DATE(payment_due, 'YYYY-MM-DD') ASC
 * ```
 */
exports.getAllInvoicesByUserId = new runtime_1.PreparedQuery(getAllInvoicesByUserIdIR);
const getInvoiceByUserAndFrontendIdIR = { "usedParamSet": { "frontendId": true, "userId": true }, "params": [{ "name": "frontendId", "required": false, "transform": { "type": "scalar" }, "locs": [{ "a": 41, "b": 51 }] }, { "name": "userId", "required": false, "transform": { "type": "scalar" }, "locs": [{ "a": 67, "b": 73 }] }], "statement": "SELECT * FROM result_invoices WHERE id = :frontendId AND user_id = :userId" };
/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM result_invoices WHERE id = :frontendId AND user_id = :userId
 * ```
 */
exports.getInvoiceByUserAndFrontendId = new runtime_1.PreparedQuery(getInvoiceByUserAndFrontendIdIR);
const addInvoiceIR = { "usedParamSet": { "frontendId": true, "createdAt": true, "description": true, "paymentTermId": true, "clientName": true, "clientEmail": true, "statusId": true, "userId": true }, "params": [{ "name": "frontendId", "required": false, "transform": { "type": "scalar" }, "locs": [{ "a": 142, "b": 152 }] }, { "name": "createdAt", "required": false, "transform": { "type": "scalar" }, "locs": [{ "a": 155, "b": 164 }] }, { "name": "description", "required": false, "transform": { "type": "scalar" }, "locs": [{ "a": 167, "b": 178 }] }, { "name": "paymentTermId", "required": false, "transform": { "type": "scalar" }, "locs": [{ "a": 181, "b": 194 }] }, { "name": "clientName", "required": false, "transform": { "type": "scalar" }, "locs": [{ "a": 197, "b": 207 }] }, { "name": "clientEmail", "required": false, "transform": { "type": "scalar" }, "locs": [{ "a": 210, "b": 221 }] }, { "name": "statusId", "required": false, "transform": { "type": "scalar" }, "locs": [{ "a": 224, "b": 232 }] }, { "name": "userId", "required": false, "transform": { "type": "scalar" }, "locs": [{ "a": 235, "b": 241 }] }], "statement": "INSERT INTO\n    invoices (frontend_id, created_at, \"description\", payment_term_id, client_name, client_email, status_id, user_id)\nVALUES\n    (:frontendId, :createdAt, :description, :paymentTermId, :clientName, :clientEmail, :statusId, :userId)\nRETURNING *" };
/**
 * Query generated from SQL:
 * ```
 * INSERT INTO
 *     invoices (frontend_id, created_at, "description", payment_term_id, client_name, client_email, status_id, user_id)
 * VALUES
 *     (:frontendId, :createdAt, :description, :paymentTermId, :clientName, :clientEmail, :statusId, :userId)
 * RETURNING *
 * ```
 */
exports.addInvoice = new runtime_1.PreparedQuery(addInvoiceIR);
const deleteInvoiceByUserAndFrontendIdIR = { "usedParamSet": { "frontendId": true, "userId": true }, "params": [{ "name": "frontendId", "required": false, "transform": { "type": "scalar" }, "locs": [{ "a": 50, "b": 60 }] }, { "name": "userId", "required": false, "transform": { "type": "scalar" }, "locs": [{ "a": 85, "b": 91 }] }], "statement": "DELETE FROM\n    invoices\nWHERE \n    frontend_id = :frontendId\n    AND \n    user_id = :userId\nRETURNING *" };
/**
 * Query generated from SQL:
 * ```
 * DELETE FROM
 *     invoices
 * WHERE
 *     frontend_id = :frontendId
 *     AND
 *     user_id = :userId
 * RETURNING *
 * ```
 */
exports.deleteInvoiceByUserAndFrontendId = new runtime_1.PreparedQuery(deleteInvoiceByUserAndFrontendIdIR);
