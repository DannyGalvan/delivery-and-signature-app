import React, { useRef } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import SignatureCapture from 'react-native-signature-capture';
import { appColors } from '@styles/appColors';
import { TouchableButton } from '@components/button/TouchableButton';
import { Title } from '@components/pure/Title';
import { StyleProp } from 'react-native';

interface SignatureCaptureImageProps {
  onSave: (result: any) => void;
  styles: StyleProp<ViewStyle>;
}

export const SignatureCaptureImage = ({
  onSave,
  styles: styledSignature,
}: SignatureCaptureImageProps) => {
  const signRef = useRef(null);

  const saveSign = () => {
    if (signRef.current) {
      signRef.current.saveImage();
    }
  };

  const resetSign = () => {
    if (signRef.current) {
      signRef.current.resetImage();
    }
  };

  const onSaveEvent = (result: any) => {
    onSave(result);
  };

  const onDragEvent = () => {
    console.log('User is drawing');
  };

  return (
    <View style={{ flexDirection: 'column' }}>
      <Title text="Firma" />
      <View style={[styles.container, styledSignature]}>
        <SignatureCapture
          style={styles.signature}
          ref={signRef}
          onSaveEvent={onSaveEvent}
          onDragEvent={onDragEvent}
          saveImageFileInExtStorage={false}
          showNativeButtons={false}
          showTitleLabel={false}
          backgroundColor={appColors.white}
          strokeColor={appColors.black}
          minStrokeWidth={4}
          maxStrokeWidth={4}
          viewMode="portrait"
        />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <TouchableButton
          title="Guardar"
          textClassName="bg-cyan-400 p-4 text-white rounded-lg"
          onPress={saveSign}
        />

        <TouchableButton
          title="Limpiar"
          textClassName="bg-cyan-400 p-4 text-white rounded-lg"
          onPress={resetSign}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBlockColor: appColors.gray,
    borderWidth: 2,
    margin: 10,
  },
  signature: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: appColors.gray,
    backgroundColor: appColors.white,
  },
});
