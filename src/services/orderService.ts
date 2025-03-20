import { ApiResponse } from '@app-types/common/ApiResponse';
import { OrderResponse } from '@app-types/orders/OrderResponse';
import { deliveryApi } from '@config/axiosConfig';

export const getAllOrders = async () => {
  const response = await deliveryApi.get<any, ApiResponse<OrderResponse[]>>(
    `Order?thenInclude=true`,
  );

  return response;
};
