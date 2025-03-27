import { useEffect, useState } from 'react';
import { useAuth } from '@hooks/useAuth';
import { dataSource } from '@database/dataSource';
import { usePersistOrders } from './usePersistOrders';

export const useDataSource = () => {
  const [loadDataSource, setLoadDataSource] = useState(false);
  const { isLoggedIn, initializeAuth, isLoading } = useAuth();
  const { updateOrders } = usePersistOrders();

  const connect = async () => {
    setLoadDataSource(true);
    try {
      if (!dataSource.isInitialized) {
        await dataSource.initialize();
        await initializeAuth();
      }

      if (!isLoggedIn) {
        setLoadDataSource(false);
        return;
      }

      await updateOrders();
    } catch (error) {
      console.log('error', error);
    }
    setLoadDataSource(false);
  };

  useEffect(() => {
    connect();
  }, [isLoading, isLoggedIn]);

  return { loadDataSource, isLoading };
};
