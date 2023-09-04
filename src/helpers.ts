import * as pg from "pg";
import { draftStatusInvoiceSchema, exceptDraftStatusInvoiceSchema, statusSchema } from "./validation-schemas";

function validateAndGetInvoiceData(content: unknown) {
    const statusObj = statusSchema.parse(content);
    const invoiceSchema = statusObj.status === "draft" ? draftStatusInvoiceSchema : exceptDraftStatusInvoiceSchema;
    return Object.assign(statusObj, invoiceSchema.parse(content));
}

function buildInvoiceParams(
    data: ReturnType<typeof validateAndGetInvoiceData>,
    statusId: number,
    paymentTermId: number
) {
    return {
        frontendId: data.id,
        createdAt: data.createdAt,
        description: data.description,
        clientName: data.clientName,
        clientEmail: data.clientEmail,
        statusId,
        paymentTermId
    };
}

function monthDatePadStart(monthOrDate: number) {
    return String(monthOrDate).padStart(2, "0");
}
function convertDateToCustomStr(date: Date) {
    return `${date.getFullYear()}-${monthDatePadStart(date.getMonth() + 1)}-${monthDatePadStart(date.getDate())}`;
}
function getDateCloneWithNumDays(date: Date, numDays: number) {
    const newDate = new Date(date.getTime());
    newDate.setDate(newDate.getDate() + numDays);
    return newDate;
}

function roundNumToTwoDigitsAfterPoint(num: number) {
    return Number(num.toFixed(2));
}

async function useTransaction<TAsyncTaskResult>(
    pool: pg.Pool, 
    asyncTask: (client: pg.PoolClient) => Promise<TAsyncTaskResult>
): Promise<TAsyncTaskResult> {
    const client = await pool.connect();
    try {
        await client.query("BEGIN");
        const result = await asyncTask(client);
        await client.query("COMMIT");
        return result;
    }
    catch(error) {
        await client.query("ROLLBACK");
        throw error;
    }
    finally {
        client.release();
    }
}

function makeShallowObjWithKeysRemoved<
    TObj extends object, 
    TKey extends keyof TObj & string
>(obj: TObj, keys: Array<TKey>) {
    const keySet = new Set<string>(keys);
    const resObj: Record<string, unknown> = {};
    for (const key of Object.keys(obj)) {
        const curKey = key as keyof TObj;
        if (!keySet.has(key)) {
            resObj[key] = obj[curKey];
        }
    }
    return resObj as Required<Omit<TObj, TKey>>;
}

export const helpers = {
    validateAndGetInvoiceData,
    buildInvoiceParams,
    convertDateToCustomStr,
    getDateCloneWithNumDays,
    roundNumToTwoDigitsAfterPoint,
    useTransaction,
    makeShallowObjWithKeysRemoved
};
