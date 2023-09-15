"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findStatusByType = void 0;
/** Types generated for queries found in "src/queries/statuses.sql" */
const runtime_1 = require("@pgtyped/runtime");
const findStatusByTypeIR = { "usedParamSet": { "type": true }, "params": [{ "name": "type", "required": false, "transform": { "type": "scalar" }, "locs": [{ "a": 54, "b": 58 }] }], "statement": "SELECT\n    *\nFROM \n    statuses\nWHERE   \n    \"type\" = :type" };
/**
 * Query generated from SQL:
 * ```
 * SELECT
 *     *
 * FROM
 *     statuses
 * WHERE
 *     "type" = :type
 * ```
 */
exports.findStatusByType = new runtime_1.PreparedQuery(findStatusByTypeIR);
