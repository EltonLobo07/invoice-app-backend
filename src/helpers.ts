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

export const helpers = {
    validateAndGetInvoiceData,
    buildInvoiceParams,
    convertDateToCustomStr,
    getDateCloneWithNumDays,
    roundNumToTwoDigitsAfterPoint
};
