import { ApiResponse } from '@app-types/common/ApiResponse';
import { dataSource } from '@database/dataSource';
import { Signature } from '@database/models/Signature';
import { saveSignature } from '@services/signatureService';
import { ToastAndroid } from 'react-native';

export const signatureRepository = dataSource.getRepository(Signature);

export const createSignature = async (signature: Signature) => {
  const response: ApiResponse<Signature> = {
    data: null,
    success: false,
    message: null,
  };
  try {
    response.data = await signatureRepository.save(signature);
    response.success = true;
    response.message = 'Firma guardada correctamente';
    return response;
  } catch (error) {
    response.message = `Error al guardar la firma, ${error}`;
    return response;
  }
};

export const getAllSignatures = async (): Promise<ApiResponse<Signature[]>> => {
  const response: ApiResponse<Signature[]> = {
    data: null,
    success: false,
    message: null,
  };
  try {
    response.data = await signatureRepository.find({
      order: { id: 'DESC' },
    });
    response.success = true;
    response.message = 'Firmas obtenidas correctamente';
    return response;
  } catch (error) {
    response.message = `Error al obtener las firmas, ${error}`;
    return response;
  }
};

export const getSignatureByOrderId = async (
  orderId: number,
): Promise<ApiResponse<Signature>> => {
  const response: ApiResponse<Signature> = {
    data: null,
    success: false,
    message: null,
  };
  try {
    response.data = await signatureRepository.findOne({ where: { orderId } });
    response.success = true;
    response.message = 'Firma obtenida correctamente';
    return response;
  } catch (error) {
    response.message = `Error al obtener la firma, ${error}`;
    return response;
  }
};

export const deleteSignature = async (orderId: number) => {
  const response: ApiResponse<Signature> = {
    data: null,
    success: false,
    message: null,
  };
  try {
    await signatureRepository.delete({ orderId });
    response.success = true;
    response.message = 'Firma eliminada correctamente';
    return response;
  } catch (error) {
    response.message = `Error al eliminar la firma, ${error}`;
    return response;
  }
};

export const sendSignaturesToServer = async (): Promise<void> => {
  try {
    const signatures = await signatureRepository.find({
      order: { id: 'DESC' },
    });

    if (signatures.length === 0) {
      return;
    }

    signatures.map((s) => (s.id = undefined));

    for (const signature of signatures) {
      const result = await saveSignature(signature);

      console.log('Result', result);

      if (!result.success) {
        return;
      }

      await signatureRepository.delete({
        orderId: signature.orderId,
        routeId: signature.routeId,
      });
    }

    ToastAndroid.show(
      'Firmas enviadas en segundo plano correctamente',
      ToastAndroid.SHORT,
    );
  } catch (error) {
    ToastAndroid.show(
      `Error al enviar las firmas en segundo plano al servidor, ${error}`,
      ToastAndroid.SHORT,
    );
  }
};
