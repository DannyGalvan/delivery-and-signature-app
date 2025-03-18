import { RouteNavigations, RoutesValues } from '../common/RouteNavigations';
import { Module } from './Module';

export interface Operation {
  id: number;
  guid: string;
  name: string;
  description: string;
  policy: string;
  icon: string;
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
