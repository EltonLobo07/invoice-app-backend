import express from "express";
import { addInvoice, getAllInvoices } from "../queries/invoices.queries";
import { pool } from "../pool";
import { helpers } from "../helpers";
import { findStatusByType } from "../queries/statuses.queries";
import { findPaymentTermByNumDays } from "../queries/payment_terms.queries";
import { addAddresses } from "../queries/addresses.queries";
import { IAddItemsResult, addItems } from "../queries/items.queries";

export const invoicesRouter = express.Router();

const BASE_URL = "/invoices";

invoicesRouter.get(BASE_URL, (_req, res) => {
    void (async () => {
        try {        
            const invoices = await getAllInvoices.run(undefined, pool);
            res.json(invoices);
        }
        catch(error) {
            console.log(error);
        }
    })();
});

invoicesRouter.post(BASE_URL, (req, res, next) => {
    void (async () => {
        try {
            const invoiceData = helpers.validateAndGetInvoiceData(req.body);
            const statusEntry = (await findStatusByType.run({
                type: invoiceData.status
            }, pool))[0];
            if (!statusEntry) {
                res.status(404).json({message: "status value not found"});
                return;
            }
            const paymentTermEntry = (await findPaymentTermByNumDays.run({
                numDays: invoiceData.paymentTerms
            }, pool))[0];
            if (!paymentTermEntry) {
                res.status(404).json({message: "paymentTerm not found"});
                return;
            }
            const [addedInvoice] = await addInvoice.run(
                helpers.buildInvoiceParams(invoiceData, statusEntry.id, paymentTermEntry.id), 
                pool
            );
            if (!addInvoice) {
                res.status(500).end();
                return;
            }
            const addedAddresses = await addAddresses.run({
                addresses: [
                    {type: "sender", invoiceId: addedInvoice.id, ...invoiceData.senderAddress},
                    {type: "client", invoiceId: addedInvoice.id, ...invoiceData.clientAddress}
                ]
            }, pool);
            let addedItems: IAddItemsResult[] = [];
            if (invoiceData.items.length > 0) {
                addedItems = await addItems.run({
                    items: invoiceData.items.map(item => ({invoiceId: addedInvoice.id, ...item})) 
                }, pool);
            }
            if (addedAddresses.length !== 2 || addedItems.length !== invoiceData.items.length) {
                res.status(500).end();
                return;
            } 
            res.status(201).json({
                id: addedInvoice.frontend_id,
                createdAt: helpers.convertDateToCustomStr(addedInvoice.created_at),
                paymentDue: helpers.convertDateToCustomStr(
                    helpers.getDateCloneWithNumDays(addedInvoice.created_at, paymentTermEntry.num_days)
                ),
                description: addedInvoice.description,
                paymentTerms: paymentTermEntry.num_days,
                clientName: addedInvoice.client_name,
                status: statusEntry.type,
                senderAddress: addedAddresses[0],
                clientAddress: addedAddresses[1],
                items: addedItems.map(item => ({
                    ...item, 
                    price: helpers.roundNumToTwoDigitsAfterPoint(Number(item.price)),
                    total: helpers.roundNumToTwoDigitsAfterPoint(Number(item.price) * Number(item.quantity))
                })),
                total: addedItems.reduce((acc, item) => (
                    helpers.roundNumToTwoDigitsAfterPoint(acc + Number(item.price) * Number(item.quantity))
                ), 0)
            });
        }
        catch(error) {
            console.log(error);
            next(error);
        }
    })();
});
