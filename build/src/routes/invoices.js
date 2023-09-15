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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.invoiceRouterAddInvoice = exports.invoicesRouter = void 0;
const express_1 = __importDefault(require("express"));
const invoices_queries_1 = require("../queries/invoices.queries");
const pool_1 = require("../pool");
const helpers_1 = require("../helpers");
const statuses_queries_1 = require("../queries/statuses.queries");
const payment_terms_queries_1 = require("../queries/payment_terms.queries");
const addresses_queries_1 = require("../queries/addresses.queries");
const items_queries_1 = require("../queries/items.queries");
const middlewares_1 = require("../middlewares");
exports.invoicesRouter = express_1.default.Router();
const BASE_URL = "/api/invoices";
exports.invoicesRouter.get(BASE_URL, middlewares_1.middlewares.extractAndDecodeToken, (req, res, next) => {
    void (() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (req.decodedToken === undefined) {
                throw new Error("logic error (bug)");
            }
            const invoices = yield invoices_queries_1.getAllInvoicesByUserId.run({
                userId: req.decodedToken.id
            }, pool_1.pool);
            res.json(helpers_1.helpers.recursiveKeyCamelCase(invoices.map(invoice => helpers_1.helpers.makeShallowObjWithKeysRemoved(invoice, ["user_id"]))));
        }
        catch (error) {
            next(error);
        }
    }))();
});
exports.invoicesRouter.get(`${BASE_URL}/:frontendId`, middlewares_1.middlewares.extractAndDecodeToken, (req, res, next) => {
    void (() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (req.decodedToken === undefined) {
                throw new Error("logic error (bug)");
            }
            const [invoice] = yield invoices_queries_1.getInvoiceByUserAndFrontendId.run({
                userId: req.decodedToken.id,
                frontendId: req.params.frontendId
            }, pool_1.pool);
            if (!invoice) {
                res.status(404).json({ message: "invoice not found" });
                return;
            }
            res.json(helpers_1.helpers.recursiveKeyCamelCase(helpers_1.helpers.makeShallowObjWithKeysRemoved(invoice, ["user_id"])));
        }
        catch (error) {
            next(error);
        }
    }))();
});
function invoiceRouterAddInvoice({ client, reqBody, res, userId, id }) {
    return __awaiter(this, void 0, void 0, function* () {
        const invoiceData = helpers_1.helpers.validateAndGetInvoiceData(reqBody, id);
        const statusEntry = (yield statuses_queries_1.findStatusByType.run({
            type: invoiceData.status
        }, client))[0];
        if (!statusEntry) {
            res === null || res === void 0 ? void 0 : res.status(404).json({ message: "status type not found" });
            return;
        }
        const paymentTermEntry = (yield payment_terms_queries_1.findPaymentTermByNumDays.run({
            numDays: invoiceData.paymentTerms
        }, client))[0];
        if (!paymentTermEntry) {
            res === null || res === void 0 ? void 0 : res.status(404).json({ message: "paymentTerm not found" });
            return;
        }
        /*
            ------------
            Danger zone
            ------------
            From this point to the very end, throw errors instead of returning from the function
    
            "useTransaction" should know if all of the queries in the async task executed
            successfully. If we handle errors here and return from the function,
            "useTransaction" will assume that all of the queries ran successfully and will
            commit the changes
        */
        const commonErrMsg = "Couldn't add invoice due to some error";
        const [addedInvoice] = yield invoices_queries_1.addInvoice.run(helpers_1.helpers.buildInvoiceParams({
            data: invoiceData,
            statusId: statusEntry.id,
            paymentTermId: paymentTermEntry.id,
            userId,
            invoiceId: id
        }), client);
        if (!invoices_queries_1.addInvoice) {
            throw new Error(commonErrMsg);
        }
        const addedAddresses = yield addresses_queries_1.addAddresses.run({
            addresses: [
                Object.assign({ type: "sender", invoiceId: addedInvoice.id }, invoiceData.senderAddress),
                Object.assign({ type: "client", invoiceId: addedInvoice.id }, invoiceData.clientAddress)
            ]
        }, client);
        if (addedAddresses.length !== 2) {
            throw new Error(commonErrMsg);
        }
        let addedItems = [];
        if (invoiceData.items.length > 0) {
            addedItems = yield items_queries_1.addItems.run({
                items: invoiceData.items.map((item, itemIdx) => (Object.assign(Object.assign({}, item), { invoiceId: addedInvoice.id, arrIndex: itemIdx, price: helpers_1.helpers.roundNumToTwoDigitsAfterPoint(item.price) })))
            }, client);
        }
        if (addedItems.length !== invoiceData.items.length) {
            throw new Error(commonErrMsg);
        }
        return {
            id: addedInvoice.frontend_id,
            createdAt: helpers_1.helpers.convertDateToCustomStr(addedInvoice.created_at),
            paymentDue: helpers_1.helpers.convertDateToCustomStr(helpers_1.helpers.getDateCloneWithNumDays(addedInvoice.created_at, paymentTermEntry.num_days)),
            description: addedInvoice.description,
            paymentTerms: paymentTermEntry.num_days,
            clientName: addedInvoice.client_name,
            clientEmail: addedInvoice.client_email,
            status: statusEntry.type,
            senderAddress: helpers_1.helpers.makeShallowObjWithKeysRemoved(addedAddresses[0], ["invoice_id", "type"]),
            clientAddress: helpers_1.helpers.makeShallowObjWithKeysRemoved(addedAddresses[1], ["invoice_id", "type"]),
            items: addedItems.map(item => {
                const roundedPrice = helpers_1.helpers.roundNumToTwoDigitsAfterPoint(Number(item.price));
                return Object.assign(Object.assign({}, (helpers_1.helpers.makeShallowObjWithKeysRemoved(item, ["invoice_id", "arr_index"]))), { price: roundedPrice, total: helpers_1.helpers.roundNumToTwoDigitsAfterPoint(roundedPrice * Number(item.quantity)) });
            })
        };
    });
}
exports.invoiceRouterAddInvoice = invoiceRouterAddInvoice;
exports.invoicesRouter.post(BASE_URL, middlewares_1.middlewares.extractAndDecodeToken, (req, res, next) => {
    void (() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (req.decodedToken === undefined) {
                throw new Error("logic error (bug)");
            }
            const { decodedToken } = req;
            const addedTransformedInvoice = yield helpers_1.helpers.useTransaction(pool_1.pool, (client) => invoiceRouterAddInvoice({
                client,
                reqBody: req.body,
                userId: decodedToken.id,
                res
            }));
            if (addedTransformedInvoice) {
                res.status(201).json(helpers_1.helpers.recursiveKeyCamelCase(addedTransformedInvoice));
            }
        }
        catch (error) {
            next(error);
        }
    }))();
});
exports.invoicesRouter.put(`${BASE_URL}/:invoiceId`, middlewares_1.middlewares.extractAndDecodeToken, (req, res, next) => {
    void (() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (req.decodedToken === undefined) {
                throw new Error("logic error (bug)");
            }
            const { decodedToken } = req;
            const updatedInvoice = yield helpers_1.helpers.useTransaction(pool_1.pool, (client) => __awaiter(void 0, void 0, void 0, function* () {
                const [deletedInvoice] = yield invoices_queries_1.deleteInvoiceByUserAndFrontendId.run({
                    userId: decodedToken.id,
                    frontendId: req.params.invoiceId
                }, client);
                if (!deletedInvoice) {
                    res.status(404).json({ message: "invoice not found" });
                    return;
                }
                return invoiceRouterAddInvoice({
                    client,
                    reqBody: req.body,
                    res,
                    userId: decodedToken.id,
                    id: req.params.invoiceId
                });
            }));
            if (updatedInvoice) {
                res.status(200).json(helpers_1.helpers.recursiveKeyCamelCase(updatedInvoice));
            }
        }
        catch (error) {
            next(error);
        }
    }))();
});
exports.invoicesRouter.delete(`${BASE_URL}/:invoiceId`, middlewares_1.middlewares.extractAndDecodeToken, (req, res, next) => {
    void (() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (req.decodedToken === undefined) {
                throw new Error("logic error (bug)");
            }
            yield invoices_queries_1.deleteInvoiceByUserAndFrontendId.run({
                userId: req.decodedToken.id,
                frontendId: req.params.invoiceId
            }, pool_1.pool);
            res.status(204).end();
        }
        catch (error) {
            next(error);
        }
    }))();
});
