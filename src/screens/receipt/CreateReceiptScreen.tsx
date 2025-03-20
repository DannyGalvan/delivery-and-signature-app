import {
  CreateReceiptRouteProps,
  CreateReceiptScreenProps,
} from '@app-types/navigators/IReceiptNavigator';
import { LabelText } from '@components/pure/LabelText';
import { Title } from '@components/pure/Title';
import { SignatureCaptureImage } from '@components/signature/SignatureCaptureImage';
import { Signature } from '@database/models/Signature';
import { createSignature } from '@database/repository/signatureRepository';
import React from 'react';
import { Alert, View } from 'react-native';

export const CreateReceiptScreen = ({
  route,
  navigation,
}: {
  route: CreateReceiptRouteProps;
  navigation: CreateReceiptScreenProps;
}) => {
  const saveSignature = async (result: any) => {
    const signature: Signature = {
      createdAt: new Date(),
      signature: result.encoded,
      state: route?.params.state,
      orderId: route?.params.orderId,
    };

    const response = await createSignature(signature);

    if (!response.success) {
      Alert.alert('Error', 'No se pudo guardar la firma');
      return;
    }

    Alert.alert('Guardado', response.message);

    navigation.navigate('list');
  };

  return (
    <View>
      <Title text="Crear Recibo" />
      <LabelText label="Pedido" text={route?.params.orderId.toString()} />
      <View className="h-[100%]">
        <SignatureCaptureImage onSave={(result) => saveSignature(result)} />
      </View>
    </View>
  );
};
