import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { useEffect } from 'react';
import { HomeNavigator } from '@navigations/HomeNavigator';
import { PrincipalStackParamList } from '@app-types/navigators/IPrincipalNavigator';
import { AuthNavigator } from '@navigations/AuthNavigator';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useAuth } from '@hooks/useAuth';
import { useErrorsStore } from '@stores/useErrorsStore';
import { DeliveryDrawer } from '@containers/Drawer';
import { appColors } from '@styles/appColors';

const Drawer = createDrawerNavigator<PrincipalStackParamList>();

export const PrincipalStack = () => {
  const { error } = useErrorsStore();
  const { navigate } = useNavigation<NavigationProp<PrincipalStackParamList>>();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('Auth');
    } else {
      navigate('Home');
    }
  }, [isLoggedIn, navigate]);

  if (error) {
    return (
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Drawer.Screen name="Auth" component={AuthNavigator} />
      </Drawer.Navigator>
    );
  }

  return (
    <Drawer.Navigator
      drawerContent={DeliveryDrawer}
      screenOptions={{
        headerShown: isLoggedIn,
        title: 'Delivery App',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 20,
          fontStyle: 'italic',
          fontWeight: 'bold',
        },
        headerStyle: { backgroundColor: appColors.white },
        headerTintColor: appColors.black,
      }}
    >
      {!isLoggedIn ? (
        <Drawer.Screen name="Auth" component={AuthNavigator} />
      ) : (
        <>
          <Drawer.Screen name="Home" component={HomeNavigator} />
        </>
      )}
    </Drawer.Navigator>
  );
};
