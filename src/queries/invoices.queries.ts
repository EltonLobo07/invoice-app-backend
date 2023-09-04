/** Types generated for queries found in "src/queries/invoices.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'GetAllInvoices' parameters type */
export type IGetAllInvoicesParams = void;

/** 'GetAllInvoices' return type */
export interface IGetAllInvoicesResult {
  client_email: string | null;
  client_name: string | null;
  created_at: Date;
  description: string | null;
  id: number;
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


/** 'AddInvoice' parameters type */
export interface IAddInvoiceParams {
  clientEmail?: string | null | void;
  clientName?: string | null | void;
  createdAt?: Date | string | null | void;
  description?: string | null | void;
  frontendId?: string | null | void;
  paymentTermId?: number | null | void;
  statusId?: number | null | void;
}

/** 'AddInvoice' return type */
export interface IAddInvoiceResult {
  client_email: string | null;
  client_name: string | null;
  created_at: Date;
  description: string | null;
  frontend_id: string;
  id: number;
  payment_term_id: number;
  status_id: number;
}

/** 'AddInvoice' query type */
export interface IAddInvoiceQuery {
  params: IAddInvoiceParams;
  result: IAddInvoiceResult;
}

const addInvoiceIR: any = {"usedParamSet":{"frontendId":true,"createdAt":true,"description":true,"paymentTermId":true,"clientName":true,"clientEmail":true,"statusId":true},"params":[{"name":"frontendId","required":false,"transform":{"type":"scalar"},"locs":[{"a":133,"b":143}]},{"name":"createdAt","required":false,"transform":{"type":"scalar"},"locs":[{"a":146,"b":155}]},{"name":"description","required":false,"transform":{"type":"scalar"},"locs":[{"a":158,"b":169}]},{"name":"paymentTermId","required":false,"transform":{"type":"scalar"},"locs":[{"a":172,"b":185}]},{"name":"clientName","required":false,"transform":{"type":"scalar"},"locs":[{"a":188,"b":198}]},{"name":"clientEmail","required":false,"transform":{"type":"scalar"},"locs":[{"a":201,"b":212}]},{"name":"statusId","required":false,"transform":{"type":"scalar"},"locs":[{"a":215,"b":223}]}],"statement":"INSERT INTO\n    invoices (frontend_id, created_at, \"description\", payment_term_id, client_name, client_email, status_id)\nVALUES\n    (:frontendId, :createdAt, :description, :paymentTermId, :clientName, :clientEmail, :statusId)\nRETURNING *"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO
 *     invoices (frontend_id, created_at, "description", payment_term_id, client_name, client_email, status_id)
 * VALUES
 *     (:frontendId, :createdAt, :description, :paymentTermId, :clientName, :clientEmail, :statusId)
 * RETURNING *
 * ```
 */
export const addInvoice = new PreparedQuery<IAddInvoiceParams,IAddInvoiceResult>(addInvoiceIR);


