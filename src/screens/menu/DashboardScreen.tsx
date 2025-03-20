import { Title } from '@components/pure/Title';
import { getAllSignatures } from '@database/repository/signatureRepository';
import { useFocusEffect } from '@react-navigation/native';
import { LoadingScreen } from '@screens/LoadingScreen';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FlatList, Image, ToastAndroid, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const Dashboard = () => {
  const { data, isLoading, refetch, isFetching } = useQuery({
    queryKey: ['dashboard'],
    queryFn: getAllSignatures,
  });

  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, []),
  );

  return (
    <SafeAreaView className="flex-1 bg-zinc-100 mt-2">
      <Title text="Firmas guardadas" />
      {isLoading ? (
        <LoadingScreen title="Espere porfavor" />
      ) : (
        <View className="w-full h-[95%] p-2">
          <FlatList
            data={data.data}
            refreshing={isFetching}
            onRefresh={() => {
              refetch();
              ToastAndroid.show('Actualizando firmas', ToastAndroid.TOP);
            }}
            renderItem={(item) => (
              <View className=" bg-white m-2 p-2 border-2 rounded-xl">
                <Title text={`Firma de orden ${item.item.orderId}`} />
                <Image
                  className="h-60 w-60"
                  source={{
                    uri: `data:image/png;base64,${item.item.signature}`,
                  }}
                />
              </View>
            )}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

// const styles = StyleSheet.create({
//   signature: {
//     flex: 1,
//     borderColor: '#000033',
//     borderWidth: 1,
//   },
//   buttonStyle: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: 50,
//     backgroundColor: '#eeeeee',
//     margin: 10,
//   },
// });
