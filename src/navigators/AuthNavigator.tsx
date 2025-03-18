import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthParamList } from '@app-types/navigators/IAuthNavigator';
import { LoginScreen } from '@screens/auth/LoginScreen';
import { RecoveryPasswordScreen } from '@screens/auth/RecoveryPasswordScreen';
import { ChangePasswordScreen } from '@screens/auth/ChangePasswordScreen';

const Stack = createStackNavigator<AuthParamList>();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Recuperar contraseña',
        }}
        name="RecoveryPassword"
        component={RecoveryPasswordScreen}
      />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
    </Stack.Navigator>
  );
};
