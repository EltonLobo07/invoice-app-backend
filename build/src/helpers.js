"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.helpers = void 0;
const invoices_1 = require("./validation-schemas/invoices");
function validateAndGetInvoiceData(content, id) {
    const statusObj = invoices_1.statusSchema.parse(content);
    const idObj = id !== undefined ? { id } : invoices_1.idSchema.parse(content);
    const invoiceSchema = statusObj.status === "draft" ? invoices_1.draftStatusInvoiceSchema : invoices_1.exceptDraftStatusInvoiceSchema;
    return Object.assign(idObj, statusObj, invoiceSchema.parse(content));
}
function buildInvoiceParams({ data, statusId, paymentTermId, userId, invoiceId }) {
    return {
        frontendId: invoiceId !== null && invoiceId !== void 0 ? invoiceId : data.id,
        createdAt: data.createdAt,
        description: data.description,
        clientName: data.clientName,
        clientEmail: data.clientEmail,
        statusId,
        paymentTermId,
        userId
    };
}
function monthDatePadStart(monthOrDate) {
    return String(monthOrDate).padStart(2, "0");
}
function convertDateToCustomStr(date) {
    return `${date.getFullYear()}-${monthDatePadStart(date.getMonth() + 1)}-${monthDatePadStart(date.getDate())}`;
}
function getDateCloneWithNumDays(date, numDays) {
    const newDate = new Date(date.getTime());
    newDate.setDate(newDate.getDate() + numDays);
    return newDate;
}
function roundNumToTwoDigitsAfterPoint(num) {
    return Number(num.toFixed(2));
}
function useTransaction(pool, asyncTask) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield pool.connect();
        try {
            yield client.query("BEGIN");
            const result = yield asyncTask(client);
            yield client.query("COMMIT");
            return result;
        }
        catch (error) {
            yield client.query("ROLLBACK");
            throw error;
        }
        finally {
            client.release();
        }
    });
}
function makeShallowObjWithKeysRemoved(obj, keys) {
    const keySet = new Set(keys);
    const resObj = {};
    for (const key of Object.keys(obj)) {
        const curKey = key;
        if (!keySet.has(key)) {
            resObj[key] = obj[curKey];
        }
    }
    return resObj;
}
/*
    I don't want to spent time writing a custom implementation so I'll copy from stack overflow
    https://stackoverflow.com/questions/59769649/recursively-convert-an-object-fields-from-snake-case-to-camelcase/75927783#75927783
*/
function recursiveKeyCamelCase(item) {
    if (Array.isArray(item)) {
        return item.map((el) => recursiveKeyCamelCase(el));
    }
    else if (typeof item === 'function' || item !== Object(item)) {
        return item;
    }
    return Object.fromEntries(Object.entries(item).map(([key, value]) => [
        key.replace(/([-_][a-z])/gi, c => c.toUpperCase().replace(/[-_]/g, '')),
        recursiveKeyCamelCase(value),
    ]));
}
function logger(...args) {
    if (process.env.NODE_ENV === "development") {
        console.log(...args);
    }
}
exports.helpers = {
    validateAndGetInvoiceData,
    buildInvoiceParams,
    convertDateToCustomStr,
    getDateCloneWithNumDays,
    roundNumToTwoDigitsAfterPoint,
    useTransaction,
    makeShallowObjWithKeysRemoved,
    recursiveKeyCamelCase,
    logger
};
