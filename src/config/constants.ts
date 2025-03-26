const URL_BASE = 'http://52.14.32.48:81';

export const URL_RESOURCES = {
  API: `${URL_BASE}/api/v1`,
  AUTH: 'auth',
  RECOVERY_PASSWORD: 'auth/RecoveryPassword',
  CHANGE_PASSWORD: 'auth/ChangePassword',
  ORDER: 'Order',
  SIGNATURE: 'signature',
  SIGNATURES_IMAGES: `${URL_BASE}/signatures`,
};

export const NAME_BD = 'quick-sqlite.db';

export const StorageKey = {
  auth: '@auth',
};

export const formatString = 'dd/MM/yyyy h:mm:ss a';

export const formatStringDate = 'dd/MM/yyyy';

export const invalid_type_error = 'El tipo provisto es invalido';

export const required_error = 'El campo es requerido';

export const STATES_TYPES = {
  CANCELADA: 0,
  PENDIENTE: 1,
  APROBADA: 2,
};

export const STATES_TYPES_LABELS = {
  0: 'Cancelada',
  1: 'pendiente',
  2: 'Aprobada',
};
