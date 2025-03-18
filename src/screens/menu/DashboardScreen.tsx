import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { appColors } from '@styles/appColors';
import { useAuth } from '@hooks/useAuth';
import { MenuItem } from '@components/card/MenuItem';
import { SignatureCaptureImage } from '@components/signature/SignatureCaptureImage';

export const Dashboard = () => {
  const { logout } = useAuth();

  return (
    <SafeAreaView className="flex-1 bg-zinc-100 mt-2">
      {/* <View className="flex flex-row flex-wrap justify-center items-center">
        <MenuItem
          title="Salir"
          icon="exit"
          iconColor={appColors.danger}
          onPress={logout}
        />
      </View> */}
      <SignatureCaptureImage />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  signature: {
    flex: 1,
    borderColor: '#000033',
    borderWidth: 1,
  },
  buttonStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#eeeeee',
    margin: 10,
  },
});
