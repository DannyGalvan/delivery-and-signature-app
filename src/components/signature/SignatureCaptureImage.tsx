import React, { useRef } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import SignatureCapture from 'react-native-signature-capture';
import { appColors } from '@styles/appColors';

interface SignatureCaptureImageProps {
  onSave: (result: any) => void;
}

export const SignatureCaptureImage = ({
  onSave,
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
    <View style={{ flex: 1, flexDirection: 'column' }}>
      <Text style={styles.title}>Firma de Recibido</Text>
      <View style={styles.container}>
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
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <TouchableHighlight style={styles.buttonStyle} onPress={saveSign}>
          <Text>Guardar</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.buttonStyle} onPress={resetSign}>
          <Text>Limpiar</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBlockColor: appColors.gray,
    borderWidth: 2,
    margin: 10,
    height: '50%',
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: appColors.black,
  },
  signature: {
    padding: 10,
    width: '100%',
    height: '100%',
    borderWidth: 1,
    borderColor: appColors.gray,
    backgroundColor: appColors.white,
  },
  buttonStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: appColors.primary,
    margin: 10,
  },
});
