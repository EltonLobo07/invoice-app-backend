/** Types generated for queries found in "src/routes/invoices/queries.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'GetAllInvoices' parameters type */
export type IGetAllInvoicesParams = void;

/** 'GetAllInvoices' return type */
export interface IGetAllInvoicesResult {
  client_email: string | null;
  client_name: string | null;
  created_at: Date;
  description: string | null;
  id: string;
  item_name: string | null;
  item_price: string | null;
  item_quantity: number | null;
  item_total: string | null;
  payment_terms: number;
  status_type: string;
}

/** 'GetAllInvoices' query type */
export interface IGetAllInvoicesQuery {
  params: IGetAllInvoicesParams;
  result: IGetAllInvoicesResult;
}

const getAllInvoicesIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT \n    invoices.id,\n    invoices.created_at,\n    invoices.description,\n    payment_terms.num_days AS payment_terms,\n    invoices.client_name,\n    invoices.client_email,\n    statuses.type AS status_type,\n    items.name AS item_name,\n    items.price AS item_price,\n    items.quantity AS item_quantity,\n    items.price * items.quantity AS item_total\nFROM \n    invoices\nJOIN \n    payment_terms ON payment_terms.id = invoices.payment_term_id\nJOIN\n    statuses ON statuses.id = invoices.status_id\nLEFT JOIN\n    items ON items.invoice_id = invoices.id"};

/**
 * Query generated from SQL:
 * ```
 * SELECT 
 *     invoices.id,
 *     invoices.created_at,
 *     invoices.description,
 *     payment_terms.num_days AS payment_terms,
 *     invoices.client_name,
 *     invoices.client_email,
 *     statuses.type AS status_type,
 *     items.name AS item_name,
 *     items.price AS item_price,
 *     items.quantity AS item_quantity,
 *     items.price * items.quantity AS item_total
 * FROM 
 *     invoices
 * JOIN 
 *     payment_terms ON payment_terms.id = invoices.payment_term_id
 * JOIN
 *     statuses ON statuses.id = invoices.status_id
 * LEFT JOIN
 *     items ON items.invoice_id = invoices.id
 * ```
 */
export const getAllInvoices = new PreparedQuery<IGetAllInvoicesParams,IGetAllInvoicesResult>(getAllInvoicesIR);


