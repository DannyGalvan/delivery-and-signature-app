import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { useAuth } from '@hooks/useAuth';
import { Logo } from '@components/Icons/Logo';
import { appColors } from '@styles/appColors';
import { AccordionMenu } from '@containers/AccordionMenu';
import { useNavigation } from '@react-navigation/native';
import { RouteNavigations } from '@app-types/common/RouteNavigations';

export const DeliveryDrawer = (props: DrawerContentComponentProps) => {
  const { logout } = useAuth();
  const { navigate } = useNavigation<RouteNavigations>();

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.containerLogo}>
        <Logo isVisible={false} style={styles.logo} />
      </View>
      <DrawerItem
        label="Inicio"
        onPress={() => navigate('Apps')}
        icon={({ color, size }) => (
          <Ionicons name="home" size={size} color={color} />
        )}
        inactiveBackgroundColor={appColors.itemMenu}
        activeBackgroundColor={appColors.gray}
        inactiveTintColor={appColors.itemMenuText}
      />
      <AccordionMenu />
      <DrawerItem
        label="Cerrar Sesión"
        onPress={logout}
        icon={({ color, size }) => (
          <Ionicons name="power" size={size} color={color} />
        )}
        inactiveBackgroundColor={appColors.danger}
        activeBackgroundColor={appColors.warning}
        inactiveTintColor={appColors.white}
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  containerLogo: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginVertical: 5,
  },
  logo: {
    width: 120,
    height: 120,
  },
});
