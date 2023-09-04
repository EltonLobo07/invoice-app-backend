/** Types generated for queries found in "src/queries/statuses.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'FindStatusByType' parameters type */
export interface IFindStatusByTypeParams {
  type?: string | null | void;
}

/** 'FindStatusByType' return type */
export interface IFindStatusByTypeResult {
  id: number;
  type: string;
}

/** 'FindStatusByType' query type */
export interface IFindStatusByTypeQuery {
  params: IFindStatusByTypeParams;
  result: IFindStatusByTypeResult;
}

const findStatusByTypeIR: any = {"usedParamSet":{"type":true},"params":[{"name":"type","required":false,"transform":{"type":"scalar"},"locs":[{"a":54,"b":58}]}],"statement":"SELECT\n    *\nFROM \n    statuses\nWHERE   \n    \"type\" = :type"};

/**
 * Query generated from SQL:
 * ```
 * SELECT
 *     *
 * FROM 
 *     statuses
 * WHERE   
 *     "type" = :type
 * ```
 */
export const findStatusByType = new PreparedQuery<IFindStatusByTypeParams,IFindStatusByTypeResult>(findStatusByTypeIR);


