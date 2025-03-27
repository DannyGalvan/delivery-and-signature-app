import { useEffect } from 'react';
import { useNetworkStore } from '@stores/useNetworkStore';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import { useAuth } from './useAuth';
import { useSignatureStore } from '@stores/useSignatureStore';
import { QueryClient, useQueryClient } from '@tanstack/react-query';

const useNetworkListener = () => {
  const { isLoggedIn } = useAuth();
  const { isSending, syncSignatures } = useSignatureStore();
  const setIsConnected = useNetworkStore((state) => state.setIsConnected);
  const client: QueryClient = useQueryClient();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      const isConnected =
        state.isConnected != null &&
        state.isConnected &&
        state.isInternetReachable;

      if (isConnected && isLoggedIn) {
        if (!isSending) {
          syncSignatures(client);
        }
      }

      setIsConnected(isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, [setIsConnected, isLoggedIn]);
};

export default useNetworkListener;
