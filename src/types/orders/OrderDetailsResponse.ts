import { OrderResponse } from '@app-types/orders/OrderResponse';

export interface OrderDetailResponse {
  id: number;
  routeId: number;
  orderId: number;
  code: number;
  sapCode: string;
  description: string;
  quantity: number;
  observations: string;
  cost: number;
  totalCost: number;
  uom: string;
  quantityDispatched: number;
  state: number;
  userId: string;
  updatedAt: Date;
  existence: number;
  picking: number;
  bars: string;
  engaged: number;
  store: number;
  receivedCustomer: number;
  missing: number;
  return: number;
  missingMotive: string;
  surplusMotive: string;
  returnId: number;
  missingId: number;
  businessId: number;
  orderHeader: OrderResponse;
}
