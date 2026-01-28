import { RoutesValues } from '../common/RouteNavigations';
import { Module } from './Module';
import { IoniconsIconName } from '@react-native-vector-icons/ionicons';

export interface Operation {
  id: number;
  guid: string;
  name: string;
  description: string;
  policy: string;
  icon: IoniconsIconName;
  path: RoutesValues;
  moduleId: number;
  state: number;
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: number;
  updatedBy: number;
  module: Module;
  rolOperations: any[];
}
