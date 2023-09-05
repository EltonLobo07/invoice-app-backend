import express, { Response } from "express";
import { addInvoice, deleteInvoiceByFrontendId, getAllInvoices, getInvoiceByFrontendId } from "../queries/invoices.queries";
import { pool } from "../pool";
import { helpers } from "../helpers";
import { findStatusByType } from "../queries/statuses.queries";
import { findPaymentTermByNumDays } from "../queries/payment_terms.queries";
import { addAddresses } from "../queries/addresses.queries";
import { IAddItemsResult, addItems } from "../queries/items.queries";
import * as pg from "pg";

export const invoicesRouter = express.Router();

const BASE_URL = "/invoices";

invoicesRouter.get(BASE_URL, (_req, res, next) => {
    void (async () => {
        try {        
            const invoices = await getAllInvoices.run(undefined, pool);
            res.json(helpers.recursiveKeyCamelCase(invoices));
        }
        catch(error) {
            console.log(error);
            next(error);
        }
    })();
});

invoicesRouter.get(`${BASE_URL}/:frontendId`, (req, res, next) => {
    void (async () => {
        try {
            const [invoice] = await getInvoiceByFrontendId.run({
                frontendId: req.params.frontendId
            }, pool);
            if (!invoice) {
                res.status(404).json({message: "invoice not found"});
                return;
            }
            res.json(helpers.recursiveKeyCamelCase(invoice));
        }
        catch(error) {
            console.log(error);
            next(error);
        }
    })();
});

async function invoiceRouterAddInvoice<
    TRes extends Response
>({ client, reqBody, res, id }: {
    client: pg.PoolClient,
    reqBody: unknown,
    res: TRes,
    id?: string 
}) {
    const invoiceData = helpers.validateAndGetInvoiceData(reqBody, id);
    const statusEntry = (await findStatusByType.run({
        type: invoiceData.status
    }, client))[0];
    if (!statusEntry) {
        res.status(404).json({message: "status type not found"});
        return;
    }
    const paymentTermEntry = (await findPaymentTermByNumDays.run({
        numDays: invoiceData.paymentTerms
    }, client))[0];
    if (!paymentTermEntry) {
        res.status(404).json({message: "paymentTerm not found"});
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
    const commonErrMsg = "Couldn't add invoice due to some error at the server";
    const [addedInvoice] = await addInvoice.run(
        helpers.buildInvoiceParams(invoiceData, statusEntry.id, paymentTermEntry.id, id), 
        client
    );
    if (!addInvoice) {
        throw new Error(commonErrMsg);
    }
    const addedAddresses = await addAddresses.run({
        addresses: [
            {type: "sender", invoiceId: addedInvoice.id, ...invoiceData.senderAddress},
            {type: "client", invoiceId: addedInvoice.id, ...invoiceData.clientAddress}
        ]
    }, client);
    if (addedAddresses.length !== 2) {
        throw new Error(commonErrMsg);
    }
    let addedItems: IAddItemsResult[] = [];
    if (invoiceData.items.length > 0) {
        addedItems = await addItems.run({
            items: invoiceData.items.map((item, itemIdx) => ({...item, invoiceId: addedInvoice.id, arrIndex: itemIdx, price: helpers.roundNumToTwoDigitsAfterPoint(item.price)})) 
        }, client);
    }
    if (addedItems.length !== invoiceData.items.length) {
        throw new Error(commonErrMsg);
    }
    return {
        id: addedInvoice.frontend_id,
        createdAt: helpers.convertDateToCustomStr(addedInvoice.created_at),
        paymentDue: helpers.convertDateToCustomStr(
            helpers.getDateCloneWithNumDays(
                addedInvoice.created_at, 
                paymentTermEntry.num_days
            )
        ),
        description: addedInvoice.description,
        paymentTerms: paymentTermEntry.num_days,
        clientName: addedInvoice.client_name,
        clientEmail: addedInvoice.client_email,
        status: statusEntry.type,
        senderAddress: helpers.makeShallowObjWithKeysRemoved(addedAddresses[0], ["invoice_id", "type"]),
        clientAddress: helpers.makeShallowObjWithKeysRemoved(addedAddresses[1], ["invoice_id", "type"]),
        items: addedItems.map(item => {
            const roundedPrice = helpers.roundNumToTwoDigitsAfterPoint(Number(item.price)); 
            return {
                ...(helpers.makeShallowObjWithKeysRemoved(item, ["invoice_id", "arr_index"])),
                price: roundedPrice,
                total: helpers.roundNumToTwoDigitsAfterPoint(
                    roundedPrice * Number(item.quantity)
                )
            };
        })
    }; 
}

invoicesRouter.post(BASE_URL, (req, res, next) => {
    void (async () => {
            try {
                const addedTransformedInvoice = await helpers.useTransaction(
                    pool,
                    (client) => invoiceRouterAddInvoice({
                        client,
                        reqBody: req.body,
                        res
                    }) 
                );
                if (addedTransformedInvoice) {
                    res.status(201).json(helpers.recursiveKeyCamelCase(addedTransformedInvoice));
                }
            }
            catch(error) {
                console.log(error);
                next(error);
            }
    })();
});

invoicesRouter.put(`${BASE_URL}/:invoiceId`, (req, res, next) => {
    void (async () => {
        try {
            const updatedInvoice = await helpers.useTransaction(
                pool, 
                async (client) => {
                    const [deletedInvoice] = await deleteInvoiceByFrontendId.run({
                        frontendId: req.params.invoiceId
                    }, client);
                    if (!deletedInvoice) {
                        res.status(404).json({message: "invoice not found"});
                        return;
                    }
                    return invoiceRouterAddInvoice({
                        client,
                        reqBody: req.body,
                        res,
                        id: req.params.invoiceId
                    });
                }
            );
            if (updatedInvoice) {
                res.status(200).json(helpers.recursiveKeyCamelCase(updatedInvoice));
            }            
        }
        catch(error) {
            console.log(error);
            next(error);
        }
    })();
});

invoicesRouter.delete(`${BASE_URL}/:invoiceId`, (req, res, next) => {
    void (async () => {
        try {
            await deleteInvoiceByFrontendId.run({
                frontendId: req.params.invoiceId
            }, pool);
            res.status(204).end();
        }
        catch(error) {
            console.log(error);
            next(error);
        }
    })();
});
