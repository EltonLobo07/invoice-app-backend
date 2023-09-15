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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const pg = __importStar(require("pg"));
const promises_1 = __importDefault(require("fs/promises"));
const helpers_1 = require("../../src/helpers");
const invoices_1 = require("../../src/routes/invoices");
const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const invoices = JSON.parse(yield promises_1.default.readFile(`${process.cwd()}/migrations/data/invoices.json`, "utf-8"));
        if (!Array.isArray(invoices)) {
            throw new Error("invoices should be an array");
        }
        for (const invoice of invoices) {
            yield helpers_1.helpers.useTransaction(pool, (client => (0, invoices_1.invoiceRouterAddInvoice)({
                client,
                reqBody: invoice,
                userId: 1
            })));
        }
        console.log("Invoices added successfully");
    }
    catch (error) {
        console.log(error);
    }
    return pool.end();
}))()
    .catch(console.log);
