import { useNetworkStore } from '@stores/useNetworkStore';
import { useOrderPersistStore } from '@stores/useOrderPersistStore';
import { Alert, ToastAndroid } from 'react-native';

export const usePersistOrders = () => {
  const { isConnected } = useNetworkStore();
  const { initializeOrderPersist, syncronizeOrders } = useOrderPersistStore();

  const updateOrders = async () => {
    const hasData = await initializeOrderPersist();

    if (!hasData) {
      return;
    }

    if (!isConnected) {
      Alert.alert('Error', 'No hay conexión a internet');
      return;
    }

    await syncronizeOrders();
  };

  return { updateOrders };
};
