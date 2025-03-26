import { deliveryApi } from '@config/axiosConfig';
import { ApiResponse } from '@app-types/common/ApiResponse';
import { LoginRequest } from '@app-types/auth/LoginRequest';
import { LoginResponse } from '@app-types/auth/LoginResponse';
import { ValidationFailure } from '@app-types/common/ValidationFailure';
import { ChangePasswordRequest } from '@app-types/auth/ChangePasswordRequest';
import { URL_RESOURCES } from '@config/constants';

export const loginService = async (credentials: LoginRequest) => {
  return await deliveryApi.post<
    any,
    ApiResponse<LoginResponse | ValidationFailure[]>,
    any
  >(URL_RESOURCES.AUTH, credentials);
};

export const recoveryPasswordService = async (dpi: string) => {
  return await deliveryApi.post<any, ApiResponse<string>, any>(
    URL_RESOURCES.RECOVERY_PASSWORD,
    { dpi },
  );
};

export const changePasswordService = async (data: ChangePasswordRequest) => {
  return await deliveryApi.put<any, ApiResponse<string>, any>(
    URL_RESOURCES.CHANGE_PASSWORD,
    data,
  );
};

export const confirmTokenService = async (token: string) => {
  const encodeToken = encodeURIComponent(token);

  return await deliveryApi.get<any, ApiResponse<string>, any>(
    `${URL_RESOURCES.AUTH}/${encodeToken}`,
  );
};
