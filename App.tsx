import React from 'react';
import { LoadingScreen } from './src/screens/LoadingScreen';
import { PrincipalStack } from './src/navigators/PrincipalStack';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useNetworkListener from './src/hooks/useNetworkListener';
import { useDataSource } from './src/hooks/useDataSource';

const client = new QueryClient();

function App(): React.JSX.Element {
  useNetworkListener();
  const { loadDataSource, isLoading } = useDataSource();

  return (
    <QueryClientProvider client={client}>
      <NavigationContainer>
        {isLoading || loadDataSource ? (
          <LoadingScreen title="Cargando Porfavor Espere..." />
        ) : (
          <PrincipalStack />
        )}
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
