import { deliveryApi } from '@config/axiosConfig';
import { ApiResponse } from '@app-types/common/ApiResponse';
import { LoginRequest } from '@app-types/auth/LoginRequest';
import { LoginResponse } from '@app-types/auth/LoginResponse';
import { ValidationFailure } from '@app-types/common/ValidationFailure';
import { ChangePasswordRequest } from '@app-types/auth/ChangePasswordRequest';

export const loginService = async (credentials: LoginRequest) => {
  return await deliveryApi.post<
    any,
    ApiResponse<LoginResponse | ValidationFailure[]>,
    any
  >('Auth', credentials);
};

export const recoveryPasswordService = async (dpi: string) => {
  return await deliveryApi.post<any, ApiResponse<string>, any>(
    'Auth/RecoveryPassword',
    { dpi },
  );
};

export const changePasswordService = async (data: ChangePasswordRequest) => {
  return await deliveryApi.put<any, ApiResponse<string>, any>(
    'Auth/ChangePassword',
    data,
  );
};

export const confirmTokenService = async (token: string) => {
  const encodeToken = encodeURIComponent(token);
  console.log('token', `auth/${encodeToken}`);
  return await deliveryApi.get<any, ApiResponse<string>, any>(
    `Auth/${encodeToken}`,
  );
};
