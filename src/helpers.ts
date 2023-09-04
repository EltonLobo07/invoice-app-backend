import { draftStatusInvoiceSchema, exceptDraftStatusInvoiceSchema, statusSchema } from "./validation-schemas";

function validateAndGetInvoiceData(content: unknown) {
    const statusObj = statusSchema.parse(content);
    const invoiceSchema = statusObj.status === "draft" ? draftStatusInvoiceSchema : exceptDraftStatusInvoiceSchema;
    return Object.assign(statusObj, invoiceSchema.parse(content));
}

export const helpers = {
    validateAndGetInvoiceData
};
