import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { OrderDetail } from './OrderDetail';
import { OrderResponse } from '@app-types/orders/OrderResponse';

@Entity()
export class Order implements OrderResponse {
  @PrimaryColumn('int')
  orderId: number;
  @Column('int')
  routeId: number;
  @Column('varchar', { length: 50 })
  center: string;
  @Column('varchar', { length: 100 })
  centerDescription: string;
  @Column('varchar', { length: 3 })
  month: string;
  @Column('varchar', { length: 4 })
  year: string;
  @Column('varchar', { length: 200 })
  observations: string;
  @Column('datetime')
  date: Date;
  @Column('varchar', { length: 50 })
  user: string;
  @Column('int')
  state: number;
  @Column('varchar', { length: 200 })
  sapCode: string;
  @Column('datetime')
  deadline: Date;
  @Column('int')
  level1Code: number;
  @Column('int')
  level2Code: number;
  @Column('int')
  level3Code: number;
  @Column('int')
  location: number;
  @Column('int')
  businessId: number;
  @Column('varchar', { length: 200 })
  sapOrder: string;
  @Column('int')
  pilotId: number;
  @Column('datetime')
  assignmentDate: Date;
  @Column('varchar', { length: 200 })
  routeObservations: string;
  @Column('int')
  capture: number;
  @Column('datetime')
  deliveryDate: Date;
  @Column('varchar', { length: 200 })
  notes: string;
  @Column('varchar', { length: 200 })
  claims: string;
  @Column('varchar', { length: 300 })
  boxes: string;
  @Column('varchar', { length: 300 })
  packages: string;
  @Column('int')
  delivered: number;
  @Column('varchar', { length: 50 })
  userPickerLoad: string;
  @Column('int')
  captPick: number;
  @Column('varchar', { length: 200 })
  address: string;
  @Column('varchar', { length: 100 })
  locationName: string;
  @Column('decimal', { precision: 18, scale: 2 })
  longitude: number;
  @Column('decimal', { precision: 18, scale: 2 })
  latitude: number;
  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.orderHeader)
  orderDetails: OrderDetail[];
}
