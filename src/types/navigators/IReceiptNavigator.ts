import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type ReceiptStackParamList = {
  list: undefined;
  createReceipt: {
    orderId: number;
    state: number;
    routeId: number;
    order: string;
  };
};

export type CreateReceiptRouteProps = RouteProp<
  ReceiptStackParamList,
  'createReceipt'
>;

export type CreateReceiptScreenProps = StackNavigationProp<
  ReceiptStackParamList,
  'createReceipt'
>;
