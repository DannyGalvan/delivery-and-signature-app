import type { StackScreenProps } from '@react-navigation/stack';

export type HomeStackParamList = {
  Apps: undefined;
  Receipt: undefined;
  Payment: undefined;
};

export type DashboardScreenProps = StackScreenProps<HomeStackParamList, 'Apps'>;
