import * as pg from "pg";
import { 
    draftStatusInvoiceSchema, 
    exceptDraftStatusInvoiceSchema, 
    idSchema, 
    statusSchema 
} from "./validation-schemas/invoices";

function validateAndGetInvoiceData(content: unknown, id?: string) {
    const statusObj = statusSchema.parse(content);
    const idObj = id !== undefined ? {id} : idSchema.parse(content);
    const invoiceSchema = statusObj.status === "draft" ? draftStatusInvoiceSchema : exceptDraftStatusInvoiceSchema;
    return Object.assign(idObj, statusObj, invoiceSchema.parse(content));
}

function buildInvoiceParams(
    {
        data,
        statusId,
        paymentTermId,
        userId,
        invoiceId
    } : {
        data: ReturnType<typeof validateAndGetInvoiceData>,
        statusId: number,
        paymentTermId: number,
        userId: number,
        invoiceId?: string
    }
) {
    return {
        frontendId: invoiceId ?? data.id,
        createdAt: data.createdAt,
        description: data.description,
        clientName: data.clientName,
        clientEmail: data.clientEmail,
        statusId,
        paymentTermId,
        userId
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

/*
    I don't want to spent time writing a custom implementation so I'll copy from stack overflow
    https://stackoverflow.com/questions/59769649/recursively-convert-an-object-fields-from-snake-case-to-camelcase/75927783#75927783
*/
function recursiveKeyCamelCase(item: unknown): unknown {
    if (Array.isArray(item)) {
        return item.map((el: unknown) => recursiveKeyCamelCase(el));
    } else if (typeof item === 'function' || item !== Object(item)) {
        return item;
    }
    return Object.fromEntries(
        Object.entries(item as Record<string, unknown>).map(
        ([key, value]: [string, unknown]) => [
            key.replace(/([-_][a-z])/gi, c => c.toUpperCase().replace(/[-_]/g, '')),
            recursiveKeyCamelCase(value),
        ],
        ),
    );
}

export const helpers = {
    validateAndGetInvoiceData,
    buildInvoiceParams,
    convertDateToCustomStr,
    getDateCloneWithNumDays,
    roundNumToTwoDigitsAfterPoint,
    useTransaction,
    makeShallowObjWithKeysRemoved,
    recursiveKeyCamelCase
};
