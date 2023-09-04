/** Types generated for queries found in "src/queries/payment_terms.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'FindPaymentTermByNumDays' parameters type */
export interface IFindPaymentTermByNumDaysParams {
  numDays?: number | null | void;
}

/** 'FindPaymentTermByNumDays' return type */
export interface IFindPaymentTermByNumDaysResult {
  id: number;
  num_days: number;
}

/** 'FindPaymentTermByNumDays' query type */
export interface IFindPaymentTermByNumDaysQuery {
  params: IFindPaymentTermByNumDaysParams;
  result: IFindPaymentTermByNumDaysResult;
}

const findPaymentTermByNumDaysIR: any = {"usedParamSet":{"numDays":true},"params":[{"name":"numDays","required":false,"transform":{"type":"scalar"},"locs":[{"a":60,"b":67}]}],"statement":"SELECT \n    * \nFROM\n    payment_terms\nWHERE \n    num_days = :numDays"};

/**
 * Query generated from SQL:
 * ```
 * SELECT 
 *     * 
 * FROM
 *     payment_terms
 * WHERE 
 *     num_days = :numDays
 * ```
 */
export const findPaymentTermByNumDays = new PreparedQuery<IFindPaymentTermByNumDaysParams,IFindPaymentTermByNumDaysResult>(findPaymentTermByNumDaysIR);


