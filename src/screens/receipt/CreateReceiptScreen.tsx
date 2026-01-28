import {
  CreateReceiptRouteProps,
  CreateReceiptScreenProps,
} from '@app-types/navigators/IReceiptNavigator';
import { LabelText } from '@components/pure/LabelText';
import { Title } from '@components/pure/Title';
import { SignatureCaptureImage } from '@components/signature/SignatureCaptureImage';
import { Order } from '@database/models/Order';
import { OrderDetail } from '@database/models/OrderDetail';
import { Signature } from '@database/models/Signature';
import { createSignature } from '@database/repository/signatureRepository';
import React, { useState } from 'react';
import Modal from 'react-native-modal';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { TouchableButton } from '@components/button/TouchableButton';
import { useToggle } from '@hooks/useToggle';
import { useNetworkStore } from '@stores/useNetworkStore';
import { saveSignature } from '@services/signatureService';

export const CreateReceiptScreen = ({
  route,
  navigation,
}: {
  route: CreateReceiptRouteProps;
  navigation: CreateReceiptScreenProps;
}) => {
  const { isConnected } = useNetworkStore();
  const [order] = useState<Order>(JSON.parse(route?.params.order));
  const { isToggled, toggle } = useToggle();

  const handleSignature = async (result: any) => {
    const signature: Signature = {
      createdAt: new Date(),
      signature: result.encoded,
      state: route?.params.state,
      routeId: route?.params.routeId,
      orderId: route?.params.orderId,
    };

    if (!isConnected) {
      const response = await createSignature(signature);

      if (!response.success) {
        Alert.alert('Error', 'No se pudo guardar la firma');
        return;
      }

      Alert.alert('Guardado', response.message);
    } else {
      const response = saveSignature(signature);

      if (!response) {
        Alert.alert('Error', 'No se pudo guardar la firma');
        return;
      }

      Alert.alert('Guardado', 'Firma guardada correctamente');
    }

    navigation.navigate('list');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Title text="Crear Recibo" />
      <View className="flex flex-col px-2 border border-gray-300 p-2 m-2 rounded-lg">
        <LabelText label="Pedido" text={route?.params.orderId.toString()} />
        <LabelText label="Centro" text={order.centerDescription} />
        <LabelText label="Ubicacion" text={order.locationName} />
        <LabelText label="Direccion" text={order.address} />
      </View>
      <View>
        <Title text="Detalles del Pedido" />
        {order.orderDetails.map((detail: OrderDetail) => (
          <View
            key={detail.id}
            className="border border-gray-300 p-2 m-2 rounded-lg"
          >
            <LabelText
              label={`Producto - ${detail.code}`}
              text={detail.description}
            />
            <View className="flex flex-row justify-center">
              <LabelText label="Cant." text={detail.quantity.toString()} />
              <LabelText label="Precio (Q)" text={detail.cost.toString()} />
              <LabelText label="Total (Q)" text={detail.totalCost.toString()} />
            </View>
          </View>
        ))}
        <TouchableButton
          title="Firmar"
          styles={styles.buttonSignature}
          textClassName="bg-cyan-400 p-4 text-center text-white rounded-lg"
          onPress={toggle}
        />
      </View>
      <Modal
        isVisible={isToggled}
        onBackdropPress={toggle}
        animationIn={'zoomIn'}
        animationOut={'zoomOut'}
      >
        <View className="bg-white p-2 rounded-xl h-[60%] justify-center items-center">
          <SignatureCaptureImage
            styles={{
              height: 200,
              width: 300,
            }}
            onSave={result => handleSignature(result)}
          />
          <TouchableButton
            title="Cerrar"
            textClassName="bg-red-500 p-4 mt-2 text-white text-center rounded-lg"
            onPress={toggle}
          />
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  buttonSignature: {
    padding: 10,
    margin: 10,
  },
});
