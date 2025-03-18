import { Module } from './Module';
import { Operation } from './Operation';

export interface Authorizations {
  module: Module;
  operations: Operation[];
}
