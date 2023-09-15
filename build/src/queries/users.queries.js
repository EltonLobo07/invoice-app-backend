"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUser = exports.getUserByEmail = void 0;
/** Types generated for queries found in "src/queries/users.sql" */
const runtime_1 = require("@pgtyped/runtime");
const getUserByEmailIR = { "usedParamSet": { "email": true }, "params": [{ "name": "email", "required": false, "transform": { "type": "scalar" }, "locs": [{ "a": 34, "b": 39 }] }], "statement": "SELECT * FROM users WHERE email = :email" };
/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM users WHERE email = :email
 * ```
 */
exports.getUserByEmail = new runtime_1.PreparedQuery(getUserByEmailIR);
const addUserIR = { "usedParamSet": { "name": true, "email": true, "passwordHash": true }, "params": [{ "name": "name", "required": false, "transform": { "type": "scalar" }, "locs": [{ "a": 76, "b": 80 }] }, { "name": "email", "required": false, "transform": { "type": "scalar" }, "locs": [{ "a": 87, "b": 92 }] }, { "name": "passwordHash", "required": false, "transform": { "type": "scalar" }, "locs": [{ "a": 99, "b": 111 }] }], "statement": "INSERT INTO users (\n    \"name\",\n    email,\n    password_hash\n)\nVALUES (\n    :name,\n    :email,\n    :passwordHash \n)\nRETURNING \"name\", email" };
/**
 * Query generated from SQL:
 * ```
 * INSERT INTO users (
 *     "name",
 *     email,
 *     password_hash
 * )
 * VALUES (
 *     :name,
 *     :email,
 *     :passwordHash
 * )
 * RETURNING "name", email
 * ```
 */
exports.addUser = new runtime_1.PreparedQuery(addUserIR);
