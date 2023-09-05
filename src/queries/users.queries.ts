/** Types generated for queries found in "src/queries/users.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'GetUserByEmail' parameters type */
export interface IGetUserByEmailParams {
  email?: string | null | void;
}

/** 'GetUserByEmail' return type */
export interface IGetUserByEmailResult {
  email: string;
  id: number;
  name: string;
  password_hash: string;
}

/** 'GetUserByEmail' query type */
export interface IGetUserByEmailQuery {
  params: IGetUserByEmailParams;
  result: IGetUserByEmailResult;
}

const getUserByEmailIR: any = {"usedParamSet":{"email":true},"params":[{"name":"email","required":false,"transform":{"type":"scalar"},"locs":[{"a":34,"b":39}]}],"statement":"SELECT * FROM users WHERE email = :email"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM users WHERE email = :email
 * ```
 */
export const getUserByEmail = new PreparedQuery<IGetUserByEmailParams,IGetUserByEmailResult>(getUserByEmailIR);


/** 'AddUser' parameters type */
export interface IAddUserParams {
  email?: string | null | void;
  name?: string | null | void;
  passwordHash?: string | null | void;
}

/** 'AddUser' return type */
export interface IAddUserResult {
  email: string;
  name: string;
}

/** 'AddUser' query type */
export interface IAddUserQuery {
  params: IAddUserParams;
  result: IAddUserResult;
}

const addUserIR: any = {"usedParamSet":{"name":true,"email":true,"passwordHash":true},"params":[{"name":"name","required":false,"transform":{"type":"scalar"},"locs":[{"a":76,"b":80}]},{"name":"email","required":false,"transform":{"type":"scalar"},"locs":[{"a":87,"b":92}]},{"name":"passwordHash","required":false,"transform":{"type":"scalar"},"locs":[{"a":99,"b":111}]}],"statement":"INSERT INTO users (\n    \"name\",\n    email,\n    password_hash\n)\nVALUES (\n    :name,\n    :email,\n    :passwordHash \n)\nRETURNING \"name\", email"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO users (
 *     "name",
 *     email,
 *     password_hash
 * )
 * VALUES (
 *     :name,
 *     :email,
 *     :passwordHash 
 * )
 * RETURNING "name", email
 * ```
 */
export const addUser = new PreparedQuery<IAddUserParams,IAddUserResult>(addUserIR);


