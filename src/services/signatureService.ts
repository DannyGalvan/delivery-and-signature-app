import { deliveryApi } from '@config/axiosConfig';
import { URL_RESOURCES } from '@config/constants';
import { Signature } from '@database/models/Signature';

export const saveSignature = async (signature: Signature) => {
  const response = await deliveryApi.post(URL_RESOURCES.SIGNATURE, signature);

  return response;
};
