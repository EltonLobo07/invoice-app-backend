/** Types generated for queries found in "src/queries/invoices.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

export type Json = null | boolean | number | string | Json[] | { [key: string]: Json };

export type JsonArray = (Json)[];

/** 'GetAllInvoicesByUserId' parameters type */
export interface IGetAllInvoicesByUserIdParams {
  userId?: number | null | void;
}

/** 'GetAllInvoicesByUserId' return type */
export interface IGetAllInvoicesByUserIdResult {
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
  user_id: number | null;
}

/** 'GetAllInvoicesByUserId' query type */
export interface IGetAllInvoicesByUserIdQuery {
  params: IGetAllInvoicesByUserIdParams;
  result: IGetAllInvoicesByUserIdResult;
}

const getAllInvoicesByUserIdIR: any = {"usedParamSet":{"userId":true},"params":[{"name":"userId","required":false,"transform":{"type":"scalar"},"locs":[{"a":46,"b":52}]}],"statement":"SELECT * FROM result_invoices WHERE user_id = :userId"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM result_invoices WHERE user_id = :userId
 * ```
 */
export const getAllInvoicesByUserId = new PreparedQuery<IGetAllInvoicesByUserIdParams,IGetAllInvoicesByUserIdResult>(getAllInvoicesByUserIdIR);


/** 'GetInvoiceByUserAndFrontendId' parameters type */
export interface IGetInvoiceByUserAndFrontendIdParams {
  frontendId?: string | null | void;
  userId?: number | null | void;
}

/** 'GetInvoiceByUserAndFrontendId' return type */
export interface IGetInvoiceByUserAndFrontendIdResult {
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
  user_id: number | null;
}

/** 'GetInvoiceByUserAndFrontendId' query type */
export interface IGetInvoiceByUserAndFrontendIdQuery {
  params: IGetInvoiceByUserAndFrontendIdParams;
  result: IGetInvoiceByUserAndFrontendIdResult;
}

const getInvoiceByUserAndFrontendIdIR: any = {"usedParamSet":{"frontendId":true,"userId":true},"params":[{"name":"frontendId","required":false,"transform":{"type":"scalar"},"locs":[{"a":41,"b":51}]},{"name":"userId","required":false,"transform":{"type":"scalar"},"locs":[{"a":67,"b":73}]}],"statement":"SELECT * FROM result_invoices WHERE id = :frontendId AND user_id = :userId"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM result_invoices WHERE id = :frontendId AND user_id = :userId
 * ```
 */
export const getInvoiceByUserAndFrontendId = new PreparedQuery<IGetInvoiceByUserAndFrontendIdParams,IGetInvoiceByUserAndFrontendIdResult>(getInvoiceByUserAndFrontendIdIR);


/** 'AddInvoice' parameters type */
export interface IAddInvoiceParams {
  clientEmail?: string | null | void;
  clientName?: string | null | void;
  createdAt?: Date | string | null | void;
  description?: string | null | void;
  frontendId?: string | null | void;
  paymentTermId?: number | null | void;
  statusId?: number | null | void;
  userId?: number | null | void;
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
  user_id: number;
}

/** 'AddInvoice' query type */
export interface IAddInvoiceQuery {
  params: IAddInvoiceParams;
  result: IAddInvoiceResult;
}

const addInvoiceIR: any = {"usedParamSet":{"frontendId":true,"createdAt":true,"description":true,"paymentTermId":true,"clientName":true,"clientEmail":true,"statusId":true,"userId":true},"params":[{"name":"frontendId","required":false,"transform":{"type":"scalar"},"locs":[{"a":142,"b":152}]},{"name":"createdAt","required":false,"transform":{"type":"scalar"},"locs":[{"a":155,"b":164}]},{"name":"description","required":false,"transform":{"type":"scalar"},"locs":[{"a":167,"b":178}]},{"name":"paymentTermId","required":false,"transform":{"type":"scalar"},"locs":[{"a":181,"b":194}]},{"name":"clientName","required":false,"transform":{"type":"scalar"},"locs":[{"a":197,"b":207}]},{"name":"clientEmail","required":false,"transform":{"type":"scalar"},"locs":[{"a":210,"b":221}]},{"name":"statusId","required":false,"transform":{"type":"scalar"},"locs":[{"a":224,"b":232}]},{"name":"userId","required":false,"transform":{"type":"scalar"},"locs":[{"a":235,"b":241}]}],"statement":"INSERT INTO\n    invoices (frontend_id, created_at, \"description\", payment_term_id, client_name, client_email, status_id, user_id)\nVALUES\n    (:frontendId, :createdAt, :description, :paymentTermId, :clientName, :clientEmail, :statusId, :userId)\nRETURNING *"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO
 *     invoices (frontend_id, created_at, "description", payment_term_id, client_name, client_email, status_id, user_id)
 * VALUES
 *     (:frontendId, :createdAt, :description, :paymentTermId, :clientName, :clientEmail, :statusId, :userId)
 * RETURNING *
 * ```
 */
export const addInvoice = new PreparedQuery<IAddInvoiceParams,IAddInvoiceResult>(addInvoiceIR);


/** 'DeleteInvoiceByUserAndFrontendId' parameters type */
export interface IDeleteInvoiceByUserAndFrontendIdParams {
  frontendId?: string | null | void;
  userId?: number | null | void;
}

/** 'DeleteInvoiceByUserAndFrontendId' return type */
export interface IDeleteInvoiceByUserAndFrontendIdResult {
  client_email: string | null;
  client_name: string | null;
  created_at: Date;
  description: string | null;
  frontend_id: string;
  id: number;
  payment_term_id: number;
  status_id: number;
  user_id: number;
}

/** 'DeleteInvoiceByUserAndFrontendId' query type */
export interface IDeleteInvoiceByUserAndFrontendIdQuery {
  params: IDeleteInvoiceByUserAndFrontendIdParams;
  result: IDeleteInvoiceByUserAndFrontendIdResult;
}

const deleteInvoiceByUserAndFrontendIdIR: any = {"usedParamSet":{"frontendId":true,"userId":true},"params":[{"name":"frontendId","required":false,"transform":{"type":"scalar"},"locs":[{"a":50,"b":60}]},{"name":"userId","required":false,"transform":{"type":"scalar"},"locs":[{"a":85,"b":91}]}],"statement":"DELETE FROM\n    invoices\nWHERE \n    frontend_id = :frontendId\n    AND \n    user_id = :userId\nRETURNING *"};

/**
 * Query generated from SQL:
 * ```
 * DELETE FROM
 *     invoices
 * WHERE 
 *     frontend_id = :frontendId
 *     AND 
 *     user_id = :userId
 * RETURNING *
 * ```
 */
export const deleteInvoiceByUserAndFrontendId = new PreparedQuery<IDeleteInvoiceByUserAndFrontendIdParams,IDeleteInvoiceByUserAndFrontendIdResult>(deleteInvoiceByUserAndFrontendIdIR);


