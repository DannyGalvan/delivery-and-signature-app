import { useEffect, useState } from 'react';
import { useAuth } from '@hooks/useAuth';
import { dataSource } from '@database/dataSource';
import { useOrderPersistStore } from '@stores/useOrderPersistStore';
import { usePersistOrders } from './usePersistOrders';

export const useDataSource = () => {
  const [loadDataSource, setLoadDataSource] = useState(false);
  const { isLoggedIn, initializeAuth, isLoading } = useAuth();
  const { updateOrders } = usePersistOrders();

  useEffect(() => {
    const connect = async () => {
      setLoadDataSource(true);
      try {
        if (!dataSource.isInitialized) {
          await dataSource.initialize();
          await initializeAuth();
        }

        if (!isLoggedIn) {
          return;
        }

        await updateOrders();
      } catch (error) {
        console.log('error', error);
      }
      setLoadDataSource(false);
    };

    connect();
  }, [isLoading, isLoggedIn]);

  return { loadDataSource, isLoading };
};
