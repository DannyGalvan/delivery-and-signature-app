import type { StackScreenProps } from '@react-navigation/stack';

export type PrincipalStackParamList = {
  Home: undefined;
  Auth: undefined;
};

export type ScreenProps = StackScreenProps<PrincipalStackParamList, 'Home'>;
