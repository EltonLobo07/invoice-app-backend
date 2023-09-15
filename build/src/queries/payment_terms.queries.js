"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findPaymentTermByNumDays = void 0;
/** Types generated for queries found in "src/queries/payment_terms.sql" */
const runtime_1 = require("@pgtyped/runtime");
const findPaymentTermByNumDaysIR = { "usedParamSet": { "numDays": true }, "params": [{ "name": "numDays", "required": false, "transform": { "type": "scalar" }, "locs": [{ "a": 60, "b": 67 }] }], "statement": "SELECT \n    * \nFROM\n    payment_terms\nWHERE \n    num_days = :numDays" };
/**
 * Query generated from SQL:
 * ```
 * SELECT
 *     *
 * FROM
 *     payment_terms
 * WHERE
 *     num_days = :numDays
 * ```
 */
exports.findPaymentTermByNumDays = new runtime_1.PreparedQuery(findPaymentTermByNumDaysIR);
