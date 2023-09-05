/** Types generated for queries found in "src/queries/items.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'AddItems' parameters type */
export interface IAddItemsParams {
  items: readonly ({
    invoiceId: number | null | void,
    name: string | null | void,
    price: number | string | null | void,
    quantity: number | null | void,
    arrIndex: number | null | void
  })[];
}

/** 'AddItems' return type */
export interface IAddItemsResult {
  arr_index: number;
  invoice_id: number;
  name: string | null;
  price: string | null;
  quantity: number | null;
}

/** 'AddItems' query type */
export interface IAddItemsQuery {
  params: IAddItemsParams;
  result: IAddItemsResult;
}

const addItemsIR: any = {"usedParamSet":{"items":true},"params":[{"name":"items","required":false,"transform":{"type":"pick_array_spread","keys":[{"name":"invoiceId","required":false},{"name":"name","required":false},{"name":"price","required":false},{"name":"quantity","required":false},{"name":"arrIndex","required":false}]},"locs":[{"a":84,"b":89}]}],"statement":"INSERT INTO\n    items (invoice_id, \"name\", price, quantity, arr_index) \nVALUES \n    :items\nRETURNING *"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO
 *     items (invoice_id, "name", price, quantity, arr_index) 
 * VALUES 
 *     :items
 * RETURNING *
 * ```
 */
export const addItems = new PreparedQuery<IAddItemsParams,IAddItemsResult>(addItemsIR);


