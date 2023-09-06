import { z } from "zod";

const ALLOWED_PAYMENT_TERM = [1, 7, 14, 30] as const;
const ALLOWED_STATUS = ["paid", "pending", "draft"] as const;
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

export const statusSchema = z.object({
    status: z.enum(ALLOWED_STATUS)
});
// First two characters should be uppercased English letters and the next four should be digits
export const idSchema = z.object({
    id: z.string().length(6).regex(/^[A-Z]{2}[0-9]{4}/)
});
const essentialsSchema = z.object({
    createdAt: z.string().refine(val => {
        const dateStr = val.toUpperCase().split("T")[0];
        return (
            (dateStr).match(/^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}$/) !== null &&
            Number.isFinite(new Date(dateStr).getTime())
        );
    }, {
        message: "should be a date string. Valid date string format: YYYY-MM-DD"
    }),
    paymentTerms: z.number().refine(val => new Set<number>(ALLOWED_PAYMENT_TERM).has(val), {
        message: `paymentTerms should be one of: ${ALLOWED_PAYMENT_TERM.join(", ")}`
    })
});

const baseClientNameSchema = z.string().max(CLIENT_NAME_MAX_LEN);
const clientNameOptionalSchema = baseClientNameSchema.optional().default("");
const clientNameRequiredSchema = baseClientNameSchema.min(1);

const clientEmailBaseSchema = z.string().max(CLIENT_EMAIL_MAX_LEN);
const clientEmailRequiredSchema = clientEmailBaseSchema.email();
const clientEmailOptionalSchema = clientEmailBaseSchema.optional().default("").refine(val => (
    val.length === 0 || 
    clientEmailRequiredSchema.safeParse(val).success
));

const baseDescriptionSchema = z.string().max(DESCRIPTION_MAX_LEN);
const descriptionOptionalSchema = baseDescriptionSchema.optional().default("");
const descriptionRequiredSchema = baseDescriptionSchema.min(1);

const baseAddressStreetSchema = z.string().max(ADDRESS_STREET_MAX_LEN);
const baseAddressCitySchema = z.string().max(ADDRESS_CITY_MAX_LEN);
const baseAddressCountrySchema = z.string().max(ADDRESS_COUNTRY_MAX_LEN);
const baseAddressPostCodeSchema = z.string().max(ADDRESS_POST_CODE_MAX_LEN); 
const addressOptionalSchema = z.object({
    street: baseAddressStreetSchema.optional().default(""),
    city: baseAddressCitySchema.optional().default(""),
    country: baseAddressCountrySchema.optional().default(""),
    postCode: baseAddressPostCodeSchema.optional().default("")
}).optional().default({});
const addressRequiredSchema = z.object({
    street: baseAddressStreetSchema.min(1),
    city: baseAddressCitySchema.min(1),
    country: baseAddressCountrySchema.min(1),
    postCode: baseAddressPostCodeSchema.min(1)
});

const baseItemNameSchema = z.string().max(ITEM_NAME_MAX_LEN);
const itemNameOptionalSchema = baseItemNameSchema.optional().default("");
const itemNameRequiredSchema = baseItemNameSchema.min(1);
const baseItemQuantitySchema = z.number().min(ITEM_QUANTITY_MIN).max(ITEM_QUANTITY_MAX);
const itemQuantityOptionalSchema = baseItemQuantitySchema.optional().default(ITEM_QUANTITY_MIN);
const itemQuantityRequiredSchema = baseItemQuantitySchema;
const baseItemPriceSchema = z.number().min(ITEM_PRICE_MIN);
const itemPriceOptionalSchema = baseItemPriceSchema.optional().default(ITEM_PRICE_MIN);
const itemPriceRequiredSchema = baseItemPriceSchema; 
const itemsOptionalSchema = z.array(z.object({
    name: itemNameOptionalSchema,
    quantity: itemQuantityOptionalSchema,
    price: itemPriceOptionalSchema
})).optional().default([]);
const itemsRequiredSchema = z.array(z.object({
    name: itemNameRequiredSchema,
    quantity: itemQuantityRequiredSchema,
    price: itemPriceRequiredSchema
})); 

export const draftStatusInvoiceSchema = essentialsSchema.and(z.object({
    clientName: clientNameOptionalSchema,
    clientEmail: clientEmailOptionalSchema,
    description: descriptionOptionalSchema,
    clientAddress: addressOptionalSchema,
    senderAddress: addressOptionalSchema,
    items: itemsOptionalSchema
}));

export const exceptDraftStatusInvoiceSchema = essentialsSchema.and(z.object({
    clientName: clientNameRequiredSchema,
    clientEmail: clientEmailRequiredSchema,
    description: descriptionRequiredSchema,
    clientAddress: addressRequiredSchema,
    senderAddress: addressRequiredSchema,
    items: itemsRequiredSchema
}));
