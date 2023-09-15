"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exceptDraftStatusInvoiceSchema = exports.draftStatusInvoiceSchema = exports.idSchema = exports.statusSchema = void 0;
const zod_1 = require("zod");
const ALLOWED_PAYMENT_TERM = [1, 7, 14, 30];
const ALLOWED_STATUS = ["paid", "pending", "draft"];
const CLIENT_NAME_MAX_LEN = 320;
const CLIENT_EMAIL_MAX_LEN = 320;
const DESCRIPTION_MAX_LEN = 512;
const ADDRESS_STREET_MAX_LEN = 512;
const ADDRESS_CITY_MAX_LEN = 320;
const ADDRESS_COUNTRY_MAX_LEN = 320;
const ADDRESS_POST_CODE_MAX_LEN = 320;
const ITEM_NAME_MAX_LEN = 320;
const ITEM_QUANTITY_MIN = 1;
const ITEM_QUANTITY_MAX = 2 ** 32 - 1;
const ITEM_PRICE_MIN = 0;
exports.statusSchema = zod_1.z.object({
    status: zod_1.z.enum(ALLOWED_STATUS)
});
// First two characters should be uppercased English letters and the next four should be digits
exports.idSchema = zod_1.z.object({
    id: zod_1.z.string().length(6).regex(/^[A-Z]{2}[0-9]{4}/)
});
const essentialsSchema = zod_1.z.object({
    createdAt: zod_1.z.string().refine(val => {
        const dateStr = val.toUpperCase().split("T")[0];
        return ((dateStr).match(/^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}$/) !== null &&
            Number.isFinite(new Date(dateStr).getTime()));
    }, {
        message: "should be a date string. Valid date string format: YYYY-MM-DD"
    }),
    paymentTerms: zod_1.z.number().refine(val => new Set(ALLOWED_PAYMENT_TERM).has(val), {
        message: `paymentTerms should be one of: ${ALLOWED_PAYMENT_TERM.join(", ")}`
    })
});
const baseClientNameSchema = zod_1.z.string().max(CLIENT_NAME_MAX_LEN);
const clientNameOptionalSchema = baseClientNameSchema.optional().default("");
const clientNameRequiredSchema = baseClientNameSchema.min(1);
const clientEmailBaseSchema = zod_1.z.string().max(CLIENT_EMAIL_MAX_LEN);
const clientEmailRequiredSchema = clientEmailBaseSchema.email();
const clientEmailOptionalSchema = clientEmailBaseSchema.optional().default("").refine(val => (val.length === 0 ||
    clientEmailRequiredSchema.safeParse(val).success));
const baseDescriptionSchema = zod_1.z.string().max(DESCRIPTION_MAX_LEN);
const descriptionOptionalSchema = baseDescriptionSchema.optional().default("");
const descriptionRequiredSchema = baseDescriptionSchema.min(1);
const baseAddressStreetSchema = zod_1.z.string().max(ADDRESS_STREET_MAX_LEN);
const baseAddressCitySchema = zod_1.z.string().max(ADDRESS_CITY_MAX_LEN);
const baseAddressCountrySchema = zod_1.z.string().max(ADDRESS_COUNTRY_MAX_LEN);
const baseAddressPostCodeSchema = zod_1.z.string().max(ADDRESS_POST_CODE_MAX_LEN);
const addressOptionalSchema = zod_1.z.object({
    street: baseAddressStreetSchema.optional().default(""),
    city: baseAddressCitySchema.optional().default(""),
    country: baseAddressCountrySchema.optional().default(""),
    postCode: baseAddressPostCodeSchema.optional().default("")
}).optional().default({});
const addressRequiredSchema = zod_1.z.object({
    street: baseAddressStreetSchema.min(1),
    city: baseAddressCitySchema.min(1),
    country: baseAddressCountrySchema.min(1),
    postCode: baseAddressPostCodeSchema.min(1)
});
const baseItemNameSchema = zod_1.z.string().max(ITEM_NAME_MAX_LEN);
const itemNameOptionalSchema = baseItemNameSchema.optional().default("");
const itemNameRequiredSchema = baseItemNameSchema.min(1);
const baseItemQuantitySchema = zod_1.z.number().min(ITEM_QUANTITY_MIN).max(ITEM_QUANTITY_MAX);
const itemQuantityOptionalSchema = baseItemQuantitySchema.optional().default(ITEM_QUANTITY_MIN);
const itemQuantityRequiredSchema = baseItemQuantitySchema;
const baseItemPriceSchema = zod_1.z.number().min(ITEM_PRICE_MIN);
const itemPriceOptionalSchema = baseItemPriceSchema.optional().default(ITEM_PRICE_MIN);
const itemPriceRequiredSchema = baseItemPriceSchema;
const itemsOptionalSchema = zod_1.z.array(zod_1.z.object({
    name: itemNameOptionalSchema,
    quantity: itemQuantityOptionalSchema,
    price: itemPriceOptionalSchema
})).optional().default([]);
const itemsRequiredSchema = zod_1.z.array(zod_1.z.object({
    name: itemNameRequiredSchema,
    quantity: itemQuantityRequiredSchema,
    price: itemPriceRequiredSchema
}));
exports.draftStatusInvoiceSchema = essentialsSchema.and(zod_1.z.object({
    clientName: clientNameOptionalSchema,
    clientEmail: clientEmailOptionalSchema,
    description: descriptionOptionalSchema,
    clientAddress: addressOptionalSchema,
    senderAddress: addressOptionalSchema,
    items: itemsOptionalSchema
}));
exports.exceptDraftStatusInvoiceSchema = essentialsSchema.and(zod_1.z.object({
    clientName: clientNameRequiredSchema,
    clientEmail: clientEmailRequiredSchema,
    description: descriptionRequiredSchema,
    clientAddress: addressRequiredSchema,
    senderAddress: addressRequiredSchema,
    items: itemsRequiredSchema
}));
