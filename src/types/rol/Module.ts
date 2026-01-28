import { IoniconsIconName } from '@react-native-vector-icons/ionicons';

export interface Module {
  id: number;
  name: string;
  description: string;
  image: IoniconsIconName;
  path: string;
  state: number;
  createdAt: string;
  updatedAt: string;
  createdBy: number;
  updatedBy: number;
}
