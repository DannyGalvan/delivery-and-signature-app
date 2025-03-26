import { ApiResponse } from '@app-types/common/ApiResponse';
import { OrderResponse } from '@app-types/orders/OrderResponse';
import { deliveryApi } from '@config/axiosConfig';
import { URL_RESOURCES } from '@config/constants';

export const getAllOrders = async () => {
  const response = await deliveryApi.get<any, ApiResponse<OrderResponse[]>>(
    `${URL_RESOURCES.ORDER}?thenInclude=true`,
  );

  return response;
};
