import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Signature {
  @PrimaryColumn('int', { generated: 'increment' })
  id?: number;
  @Column('int')
  orderId: number;
  @Column('int')
  routeId: number;
  @Column('int')
  state: number;
  @Column('varchar')
  signature: string;
  @Column('datetime')
  createdAt: Date;
}
