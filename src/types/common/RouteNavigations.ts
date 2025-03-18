import { NavigationProp } from '@react-navigation/native';
import { HomeStackParamList } from '@app-types/navigators/IHomeNavigator';
import { PrincipalStackParamList } from '@app-types/navigators/IPrincipalNavigator';

export type RouteNavigations = NavigationProp<
  HomeStackParamList & PrincipalStackParamList
>;

export type RoutesValues = 'Apps' | 'Home' | 'Auth' | 'Receipt' | 'Payment';
