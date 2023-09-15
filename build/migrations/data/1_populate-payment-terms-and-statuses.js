"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const pg = __importStar(require("pg"));
const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL
});
const PAYMENT_TERMS = "payment_terms";
const STATUSES = "statuses";
pool
    .query(`
        INSERT INTO 
            ${PAYMENT_TERMS} (num_days)
        VALUES
            (1),
            (7),
            (14),
            (30); 
    `)
    .then(() => {
    console.log(`Rows added to: ${PAYMENT_TERMS}`);
    return pool.query(`
            INSERT INTO
                ${STATUSES} (type)
            VALUES 
                ('draft'),
                ('paid'),
                ('pending');
        `);
})
    .then(() => {
    console.log(`Rows added to: ${STATUSES}`);
})
    .catch(console.log)
    .then(() => pool.end())
    .catch(console.log);
