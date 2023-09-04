/** Types generated for queries found in "src/queries/addresses.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

export type address_type = 'client' | 'sender';

/** 'AddAddresses' parameters type */
export interface IAddAddressesParams {
  addresses: readonly ({
    invoiceId: number | null | void,
    type: address_type | null | void,
    street: string | null | void,
    city: string | null | void,
    country: string | null | void,
    postCode: string | null | void
  })[];
}

/** 'AddAddresses' return type */
export interface IAddAddressesResult {
  city: string | null;
  country: string | null;
  invoice_id: number;
  post_code: string | null;
  street: string | null;
  type: address_type;
}

/** 'AddAddresses' query type */
export interface IAddAddressesQuery {
  params: IAddAddressesParams;
  result: IAddAddressesResult;
}

const addAddressesIR: any = {"usedParamSet":{"addresses":true},"params":[{"name":"addresses","required":false,"transform":{"type":"pick_array_spread","keys":[{"name":"invoiceId","required":false},{"name":"type","required":false},{"name":"street","required":false},{"name":"city","required":false},{"name":"country","required":false},{"name":"postCode","required":false}]},"locs":[{"a":93,"b":102}]}],"statement":"INSERT INTO \n    addresses (invoice_id, \"type\", street, city, country, post_code)\nVALUES\n    :addresses\nRETURNING *"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO 
 *     addresses (invoice_id, "type", street, city, country, post_code)
 * VALUES
 *     :addresses
 * RETURNING *
 * ```
 */
export const addAddresses = new PreparedQuery<IAddAddressesParams,IAddAddressesResult>(addAddressesIR);


