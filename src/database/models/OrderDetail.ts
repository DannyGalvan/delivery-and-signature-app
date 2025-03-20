import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Order } from './Order';
import { OrderDetailResponse } from '@app-types/orders/OrderDetailsResponse';

@Entity()
export class OrderDetail implements OrderDetailResponse {
  @PrimaryColumn('int')
  id: number;
  @Column('int')
  routeId: number;
  @Column('int')
  orderId: number;
  @Column('int')
  code: number;
  @Column('varchar')
  sapCode: string;
  @Column('varchar')
  description: string;
  @Column('int')
  quantity: number;
  @Column('varchar')
  observations: string;
  @Column('decimal', { precision: 18, scale: 2 })
  cost: number;
  @Column('decimal', { precision: 18, scale: 2 })
  totalCost: number;
  @Column('varchar')
  uom: string;
  @Column('int')
  quantityDispatched: number;
  @Column('int')
  state: number;
  @Column('varchar')
  userId: string;
  @Column('datetime')
  updatedAt: Date;
  @Column('int')
  existence: number;
  @Column('int')
  picking: number;
  @Column('varchar')
  bars: string;
  @Column('int')
  engaged: number;
  @Column('int')
  store: number;
  @Column('int')
  receivedCustomer: number;
  @Column('int')
  missing: number;
  @Column('int')
  return: number;
  @Column('varchar')
  missingMotive: string;
  @Column('varchar')
  surplusMotive: string;
  @Column('int')
  returnId: number;
  @Column('int')
  missingId: number;
  @Column('int')
  businessId: number;
  @ManyToOne(() => Order, (order) => order.orderDetails)
  @JoinColumn({ name: 'orderId' })
  orderHeader: Order;
}
