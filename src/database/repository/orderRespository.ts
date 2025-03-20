import { ApiResponse } from '@app-types/common/ApiResponse';
import { dataSource } from '@database/dataSource';
import { Order } from '@database/models/Order';
import { OrderDetail } from '@database/models/OrderDetail';

export const orderRepository = dataSource.getRepository(Order);
export const orderDetailRepository = dataSource.getRepository(OrderDetail);

export const bulkCreateOrder = async (orders: Order[]) => {
  const response: ApiResponse<Order[]> = {
    data: null,
    success: false,
    message: null,
  };

  try {
    response.data = await orderRepository.save(orders);
    response.success = true;
    response.message = 'Ordenes guardadas correctamente';

    const details = orders.map((order) => order.orderDetails).flat();

    await orderDetailRepository.save(details);

    return response;
  } catch (error) {
    response.message = `Error al guardar las ordenes, ${error}`;

    return response;
  }
};

export const getAllOrdersPersist = async (): Promise<ApiResponse<Order[]>> => {
  const response: ApiResponse<Order[]> = {
    data: null,
    success: false,
    message: null,
  };

  try {
    response.data = await orderRepository.find({
      relations: ['orderDetails'],
      order: { orderId: 'DESC' },
    });
    response.success = true;
    response.message = 'Ordenes obtenidas correctamente';

    return response;
  } catch (error) {
    response.message = `Error al obtener las ordenes, ${error}`;

    return response;
  }
};

export const clearAllOrders = async (): Promise<ApiResponse<Order[]>> => {
  const response: ApiResponse<Order[]> = {
    data: null,
    success: false,
    message: null,
  };

  try {
    await orderDetailRepository.clear();
    await orderRepository.clear();

    response.data = [];
    response.success = true;
    response.message = 'Ordenes eliminadas correctamente';

    return response;
  } catch (error) {
    response.message = `Error al eliminar las ordenes, ${error}`;

    return response;
  }
};
