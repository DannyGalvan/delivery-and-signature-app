import { HttpStatusCode } from '@app-types/common/StatusCode';

export interface AppError {
  statusCode: HttpStatusCode;
  message: string;
  name: string;
}
