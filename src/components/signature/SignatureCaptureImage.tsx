import React, { useRef } from 'react';
import { StyleSheet, View, ViewStyle, StyleProp } from 'react-native';
import SignatureScreen from 'react-native-signature-canvas';
import { appColors } from '@styles/appColors';
import { TouchableButton } from '@components/button/TouchableButton';
import { Title } from '@components/pure/Title';

interface SignatureCaptureImageProps {
  onSave: (result: any) => void;
  styles: StyleProp<ViewStyle>;
}

export const SignatureCaptureImage = ({
  onSave,
  styles: styledSignature,
}: SignatureCaptureImageProps) => {
  const signRef = useRef<any>(null);

  const saveSign = () => {
    if (signRef.current) {
      signRef.current.readSignature();
    }
  };

  const resetSign = () => {
    if (signRef.current) {
      signRef.current.clearSignature();
    }
  };

  const handleSignature = (signature: string) => {
    // La librería devuelve la firma en base64 directamente
    onSave({ encoded: signature });
  };

  const handleEmpty = () => {
    console.log('La firma está vacía');
  };

  return (
    <View style={{ flexDirection: 'column', flex: 1 }}>
      <Title text="Firma" />
      <View style={[styles.container, styledSignature]}>
        <SignatureScreen
          ref={signRef}
          onOK={handleSignature}
          onEmpty={handleEmpty}
          descriptionText=""
          clearText="Limpiar"
          confirmText="Guardar"
          webStyle={`
            .m-signature-pad {
              box-shadow: none;
              border: none;
              margin: 0;
            }
            .m-signature-pad--body {
              border: none;
              background-color: ${appColors.white};
            }
            .m-signature-pad--footer {
              display: none;
            }
            body,html {
              width: 100%;
              height: 100%;
              margin: 0;
              padding: 0;
            }
            canvas {
              background-color: ${appColors.white};
            }
          `}
          penColor={appColors.black}
          minWidth={2}
          maxWidth={4}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 10,
        }}
      >
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
    borderColor: appColors.gray,
    borderWidth: 2,
    margin: 10,
    height: 200,
    overflow: 'hidden',
  },
});
