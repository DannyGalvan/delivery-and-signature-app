import { ApiResponse } from '@app-types/common/ApiResponse';
import { deliveryApi } from '@config/axiosConfig';
import { URL_RESOURCES } from '@config/constants';
import { Signature } from '@database/models/Signature';

export const saveSignature = async (signature: Signature) => {
  const response = await deliveryApi.post<any, ApiResponse<Signature>>(
    URL_RESOURCES.SIGNATURE,
    signature,
  );

  return response;
};
