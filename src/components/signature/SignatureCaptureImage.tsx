import React, { useRef, useState } from 'react';
import { StyleSheet, View, ViewStyle, StyleProp, Image } from 'react-native';
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
  const [signature, setSignature] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef<any>(null);

  const handleSignature = signature => {
    console.log('Signature captured:', signature);
    setSignature(signature);
    setIsLoading(false);
  };

  const handleEmpty = () => {
    console.log('Signature is empty');
    setIsLoading(false);
  };

  const handleClear = () => {
    console.log('Signature cleared');
    setSignature(null);
  };

  const handleError = error => {
    console.error('Signature pad error:', error);
    setIsLoading(false);
  };

  const handleEnd = () => {
    setIsLoading(true);
    ref.current?.readSignature();
  };

  return (
    <View style={{ flexDirection: 'column', flex: 1 }}>
      <Title text="Firma" />
      <View style={styles.preview}>
        {signature && (
          <Image
            resizeMode="contain"
            style={{ width: 335, height: 114 }}
            source={{ uri: signature }}
          />
        )}
      </View>
      <View style={[styles.container, styledSignature]}>
        <SignatureScreen
          ref={ref}
          onEnd={handleEnd}
          onOK={handleSignature}
          onEmpty={handleEmpty}
          onClear={handleClear}
          onError={handleError}
          autoClear={true}
          descriptionText="Sign here"
          clearText="Clear"
          confirmText={isLoading ? 'Processing...' : 'Save'}
          penColor="#000000"
          backgroundColor="rgba(255,255,255,0)"
          webviewProps={{
            cacheEnabled: false,
            androidLayerType: 'hardware',
          }}
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
          onPress={() => onSave({ encoded: signature })}
        />

        <TouchableButton
          title="Limpiar"
          textClassName="bg-cyan-400 p-4 text-white rounded-lg"
          onPress={() => setSignature(null)}
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
  preview: {
    width: 335,
    height: 114,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
});
