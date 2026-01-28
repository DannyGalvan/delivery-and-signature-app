import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {
  Ionicons,
  IoniconsIconName,
} from '@react-native-vector-icons/ionicons';

interface Props {
  styles?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  className?: string;
  textClassName?: string;
  onPress: () => void;
  title?: string;
  iconColor?: string;
  icon?: IoniconsIconName;
  iconSize?: number;
}

export const TouchableButton = ({
  styles,
  icon,
  onPress,
  textStyle,
  title,
  iconColor,
  iconSize,
  className,
  textClassName,
}: Props) => {
  return (
    <TouchableOpacity
      className={className}
      style={styles}
      onPress={onPress}
      accessibilityLabel={title}
    >
      {title && (
        <Text className={textClassName} style={textStyle}>
          {title}
        </Text>
      )}
      {icon && <Ionicons name={icon} size={iconSize ?? 30} color={iconColor} />}
    </TouchableOpacity>
  );
};
