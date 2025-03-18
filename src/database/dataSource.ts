import { typeORMDriver } from 'react-native-quick-sqlite';
import { DataSource } from 'typeorm';
import { NAME_BD } from '@config/constants';
import { SessionStorage } from '@models/SessionStorage';

export const dataSource = new DataSource({
  database: NAME_BD,
  entities: [SessionStorage],
  location: '.',
  logging: [],
  synchronize: true,
  logger: 'advanced-console',
  type: 'react-native',
  driver: typeORMDriver,
});

//logging: ['query', 'error', 'info', 'warn', 'log', 'schema']
