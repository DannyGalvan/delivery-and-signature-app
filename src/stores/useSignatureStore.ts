import { sendSignaturesToServer } from '@database/repository/signatureRepository';
import { QueryClient } from '@tanstack/react-query';
import { create } from 'zustand';

interface SignatureStore {
  isSending: boolean | null;
  syncSignatures: (client: QueryClient) => Promise<void>;
  setIsSending: (isSending: boolean) => void;
}

export const useSignatureStore = create<SignatureStore>((set) => ({
  isSending: false,
  setIsSending: (isSending: boolean) => set({ isSending }),
  syncSignatures: async (client: QueryClient) => {
    // Verificamos si ya está en ejecución antes de comenzar otra
    const { isSending, setIsSending } = useSignatureStore.getState();
    if (isSending) {
      console.log(
        'Ya se está enviando una solicitud, esperando a que termine...',
      );
      return;
    }

    try {
      setIsSending(true);

      await sendSignaturesToServer();

      client.refetchQueries({ queryKey: ['signatures'] });
    } catch (error) {
      console.log('Error al enviar las firmas', error);
    } finally {
      setIsSending(false);
    }
  },
}));
