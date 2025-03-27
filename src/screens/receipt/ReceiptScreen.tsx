import React from 'react';
import {
  Alert,
  FlatList,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import { Title } from '@components/pure/Title';
import { useOrderPersistStore } from '@stores/useOrderPersistStore';
import { LabelText } from '@components/pure/LabelText';
import { useNetworkStore } from '@stores/useNetworkStore';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { ReceiptStackParamList } from '@app-types/navigators/IReceiptNavigator';

export const ReceiptScreen = () => {
  const { isConnected } = useNetworkStore();
  const { navigate } = useNavigation<NavigationProp<ReceiptStackParamList>>();
  const { isLoadingPersist, orderPersist, syncronizeOrders } =
    useOrderPersistStore();

  return (
    <View>
      <Title text="Listar Pedidos" />
      <View className="flex flex-col px-2 h-[95%]">
        <FlatList
          data={orderPersist}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="border border-gray-300 p-2 m-2 rounded-lg"
              onPress={() =>
                navigate('createReceipt', {
                  orderId: item.orderId,
                  state: item.state,
                  routeId: item.routeId,
                  order: JSON.stringify(item),
                })
              }
            >
              <LabelText label={'Pedido'} text={item.orderId.toString()} />
              <LabelText label={'Centro'} text={item.centerDescription} />
              <LabelText label={'Direccion'} text={item.address} />
              <LabelText label={'Ubicacion'} text={item.locationName} />
              <LabelText label={'Estado'} text={item.state.toString()} />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.orderId.toString()}
          ListEmptyComponent={<Title text="No hay pedidos" />}
          refreshing={isLoadingPersist}
          onRefresh={() => {
            if (isConnected) {
              syncronizeOrders();
              ToastAndroid.show(
                'Ordenes sincronizadas correctamente',
                ToastAndroid.TOP,
              );
            } else
              Alert.alert(
                'Sin Conexion',
                'Para sincronizar necesita conexion a internet',
              );
          }}
        />
      </View>
    </View>
  );
};
