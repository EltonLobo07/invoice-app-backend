/** Types generated for queries found in "src/queries/invoices.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

export type Json = null | boolean | number | string | Json[] | { [key: string]: Json };

export type JsonArray = (Json)[];

/** 'GetAllInvoices' parameters type */
export type IGetAllInvoicesParams = void;

/** 'GetAllInvoices' return type */
export interface IGetAllInvoicesResult {
  client_address: Json | null;
  client_email: string | null;
  client_name: string | null;
  created_at: string | null;
  description: string | null;
  id: string | null;
  items: JsonArray | null;
  payment_due: string | null;
  payment_terms: number | null;
  sender_address: Json | null;
  status: string | null;
}

/** 'GetAllInvoices' query type */
export interface IGetAllInvoicesQuery {
  params: IGetAllInvoicesParams;
  result: IGetAllInvoicesResult;
}

const getAllInvoicesIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT * FROM result_invoices"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM result_invoices
 * ```
 */
export const getAllInvoices = new PreparedQuery<IGetAllInvoicesParams,IGetAllInvoicesResult>(getAllInvoicesIR);


/** 'GetInvoiceByFrontendId' parameters type */
export interface IGetInvoiceByFrontendIdParams {
  frontendId?: string | null | void;
}

/** 'GetInvoiceByFrontendId' return type */
export interface IGetInvoiceByFrontendIdResult {
  client_address: Json | null;
  client_email: string | null;
  client_name: string | null;
  created_at: string | null;
  description: string | null;
  id: string | null;
  items: JsonArray | null;
  payment_due: string | null;
  payment_terms: number | null;
  sender_address: Json | null;
  status: string | null;
}

/** 'GetInvoiceByFrontendId' query type */
export interface IGetInvoiceByFrontendIdQuery {
  params: IGetInvoiceByFrontendIdParams;
  result: IGetInvoiceByFrontendIdResult;
}

const getInvoiceByFrontendIdIR: any = {"usedParamSet":{"frontendId":true},"params":[{"name":"frontendId","required":false,"transform":{"type":"scalar"},"locs":[{"a":41,"b":51}]}],"statement":"SELECT * FROM result_invoices WHERE id = :frontendId"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM result_invoices WHERE id = :frontendId
 * ```
 */
export const getInvoiceByFrontendId = new PreparedQuery<IGetInvoiceByFrontendIdParams,IGetInvoiceByFrontendIdResult>(getInvoiceByFrontendIdIR);


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


/** 'DeleteInvoiceByFrontendId' parameters type */
export interface IDeleteInvoiceByFrontendIdParams {
  frontendId?: string | null | void;
}

/** 'DeleteInvoiceByFrontendId' return type */
export interface IDeleteInvoiceByFrontendIdResult {
  client_email: string | null;
  client_name: string | null;
  created_at: Date;
  description: string | null;
  frontend_id: string;
  id: number;
  payment_term_id: number;
  status_id: number;
}

/** 'DeleteInvoiceByFrontendId' query type */
export interface IDeleteInvoiceByFrontendIdQuery {
  params: IDeleteInvoiceByFrontendIdParams;
  result: IDeleteInvoiceByFrontendIdResult;
}

const deleteInvoiceByFrontendIdIR: any = {"usedParamSet":{"frontendId":true},"params":[{"name":"frontendId","required":false,"transform":{"type":"scalar"},"locs":[{"a":50,"b":60}]}],"statement":"DELETE FROM\n    invoices\nWHERE \n    frontend_id = :frontendId\nRETURNING *"};

/**
 * Query generated from SQL:
 * ```
 * DELETE FROM
 *     invoices
 * WHERE 
 *     frontend_id = :frontendId
 * RETURNING *
 * ```
 */
export const deleteInvoiceByFrontendId = new PreparedQuery<IDeleteInvoiceByFrontendIdParams,IDeleteInvoiceByFrontendIdResult>(deleteInvoiceByFrontendIdIR);


