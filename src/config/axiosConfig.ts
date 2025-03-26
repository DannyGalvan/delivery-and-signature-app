import axios from 'axios';

import { ForbiddenError, UnauthorizedError } from '@app-types/errors/Errors';
import { URL_RESOURCES } from '@config/constants';

export const deliveryApi = axios.create({
  baseURL: URL_RESOURCES.API,
  headers: {
    'Content-Type': 'application/json',
  },
});

deliveryApi.interceptors.response.use(
  async (response) => {
    return response.data;
  },
  (error) => {
    const { response } = error;

    if (response.status === 400 || response.status === 200) {
      return response.data;
    }
    if (response.status === 401) {
      throw new UnauthorizedError(
        'Tu sesión ha expirado vuelve a iniciar sesión',
      );
    }
    if (response.status === 403) {
      throw new ForbiddenError(
        'No tienes permisos para realizar esta acción, contacta con el administrador',
      );
    }
    if (response.status === 500) {
      throw new Error(
        'Hubo un error en el servidor, contacta al desarrollador',
      );
    }
  },
);

export const setAuthorizationHeader = (token: string) => {
  deliveryApi.defaults.headers.common.Authorization = `Bearer ${token}`;
  deliveryApi.defaults.headers.Authorization = `Bearer ${token}`;
};
