import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { ReceiptScreen } from '@screens/receipt/ReceiptScreen';
import { ReceiptStackParamList } from '@app-types/navigators/IReceiptNavigator';
import { CreateReceiptScreen } from '@screens/receipt/CreateReceiptScreen';

const Stack = createStackNavigator<ReceiptStackParamList>();

export const ReceiptNavigator = () => {
  return (
    <Stack.Navigator
      id="ReceiptNavigator"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="list" component={ReceiptScreen} />
      <Stack.Screen name="createReceipt" component={CreateReceiptScreen} />
    </Stack.Navigator>
  );
};
