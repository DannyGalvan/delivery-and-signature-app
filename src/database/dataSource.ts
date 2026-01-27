import { typeORMDriver } from 'react-native-nitro-sqlite';
import { DataSource } from 'typeorm';
import { NAME_BD } from '@config/constants';
import { SessionStorage } from '@models/SessionStorage';
import { Order } from '@models/Order';
import { OrderDetail } from '@models/OrderDetail';
import { Signature } from './models/Signature';

export const dataSource = new DataSource({
  database: NAME_BD,
  entities: [SessionStorage, Order, OrderDetail, Signature],
  location: '.',
  logging: ['error', 'log', 'schema', 'warn'],
  synchronize: true,
  logger: 'advanced-console',
  type: 'react-native',
  driver: typeORMDriver,
});

//logging: ['query', 'error', 'info', 'warn', 'log', 'schema']
