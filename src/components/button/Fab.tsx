import React from 'react';
import {
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {
  Ionicons,
  IoniconsIconName,
} from '@react-native-vector-icons/ionicons';

interface Props {
  iconName: IoniconsIconName;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  isLoading?: boolean;
}

export const Fab = ({ iconName, onPress, style, isLoading }: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.blackButton, style]}
    >
      {!isLoading ? (
        <Ionicons name={iconName} size={35} color="white" />
      ) : (
        <ActivityIndicator color="white" size={30} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  blackButton: {
    zIndex: 9999,
    height: 50,
    width: 50,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,
    elevation: 17,
  },
});
