import { Order } from '@database/models/Order';
import {
  bulkCreateOrder,
  clearAllOrders,
  getAllOrdersPersist,
} from '@database/repository/orderRespository';
import { getAllOrders } from '@services/orderService';
import { Alert } from 'react-native';
import { create } from 'zustand';

interface OrderPersistStore {
  isLoadingPersist: boolean;
  orderPersist: Array<Order>;
  getByOrderId: (orderId: number) => Order | undefined;
  initializeOrderPersist: () => Promise<boolean>;
  syncronizeOrders: () => Promise<void>;
  clearOrderPersist: () => Promise<void>;
}

export const useOrderPersistStore = create<OrderPersistStore>((set, get) => ({
  isLoadingPersist: false,
  orderPersist: [],
  getByOrderId: (orderId: number) => {
    const order = get().orderPersist.find((o) => o.orderId === orderId);

    return order;
  },
  initializeOrderPersist: async () => {
    const result = await getAllOrdersPersist();

    if (!result.success) {
      Alert.alert('Error', result.message);
      return;
    }

    set({ orderPersist: result.data });

    return result.data.length === 0;
  },
  syncronizeOrders: async () => {
    set({ isLoadingPersist: true });
    const orders = await getAllOrders();

    if (!orders.success) {
      Alert.alert('Error', orders.message);
      set({ isLoadingPersist: false });
      return;
    }

    const clear = await clearAllOrders();

    if (!clear.success) {
      Alert.alert('Error', clear.message);
      set({ isLoadingPersist: false });
      return;
    }

    const result = await bulkCreateOrder(orders.data);

    if (!result.success) {
      Alert.alert('Error', result.message);
      set({ isLoadingPersist: false });
      return;
    }

    set({ orderPersist: result.data, isLoadingPersist: false });
  },
  clearOrderPersist: async () => {
    const clear = await clearAllOrders();

    if (!clear.success) {
      Alert.alert('Error', clear.message);
      return;
    }

    set({ orderPersist: [] });
  },
}));
