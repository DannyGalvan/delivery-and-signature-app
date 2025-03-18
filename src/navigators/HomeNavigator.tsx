import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Dashboard } from '@screens/menu/DashboardScreen';
import { HomeStackParamList } from '@app-types/navigators/IHomeNavigator';
import { PaymentScreen } from '@screens/menu/PaymentScreen';
import { ReceiptScreen } from '@screens/menu/ReceiptScreen';

const Stack = createStackNavigator<HomeStackParamList>();

export const HomeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Apps" component={Dashboard} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
      <Stack.Screen name="Receipt" component={ReceiptScreen} />
    </Stack.Navigator>
  );
};
