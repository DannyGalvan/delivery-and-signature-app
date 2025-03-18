import { Authorizations } from '@app-types/rol/Authorizations';

export interface LoginResponse {
  name: string;
  email: string;
  token: string;
  redirect: string;
  userId: number;
  employeeCode: string;
  companyCode: number;
  rol: number;
  operations: Authorizations[];
}
