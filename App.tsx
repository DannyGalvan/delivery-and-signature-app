import React from 'react';
import { LoadingScreen } from './src/screens/LoadingScreen';
import { PrincipalStack } from './src/navigators/PrincipalStack';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useNetworkListener from './src/hooks/useNetworkListener';
import { useDataSource } from './src/hooks/useDataSource';

const client = new QueryClient();

function Wrap(): React.JSX.Element {
  useNetworkListener();
  const { loadDataSource, isLoading } = useDataSource();

  return (
    <NavigationContainer>
      {loadDataSource || isLoading ? (
        <LoadingScreen title="Cargando Porfavor Espere..." />
      ) : (
        <PrincipalStack />
      )}
    </NavigationContainer>
  );
}

function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={client}>
      <Wrap />
    </QueryClientProvider>
  );
}

export default App;
