import { OrderDetailResponse } from '@app-types/orders/OrderDetailsResponse';

export interface OrderResponse {
  routeId: number;
  orderId: number;
  center: string;
  centerDescription: string;
  month: string;
  year: string;
  observations: string;
  date: Date;
  user: string;
  state: number;
  sapCode: string;
  deadline: Date;
  level1Code: number;
  level2Code: number;
  level3Code: number;
  location: number;
  businessId: number;
  sapOrder: string;
  pilotId: number;
  assignmentDate: Date;
  routeObservations: string;
  capture: number;
  deliveryDate: Date;
  notes: string;
  claims: string;
  boxes: string;
  packages: string;
  delivered: number;
  userPickerLoad: string;
  captPick: number;
  address: string;
  locationName: string;
  longitude: number;
  latitude: number;
  orderDetails: OrderDetailResponse[];
}
