import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type ReceiptStackParamList = {
  list: undefined;
  createReceipt: { orderId: number; state: number };
};

export type CreateReceiptRouteProps = RouteProp<
  ReceiptStackParamList,
  'createReceipt'
>;

export type CreateReceiptScreenProps = StackNavigationProp<
  ReceiptStackParamList,
  'createReceipt'
>;
