import { z } from 'zod';
import { invalid_type_error, required_error } from '@config/constants';

export const authShema = z.object({
  userName: z
    .string({ invalid_type_error, required_error })
    .nonempty({ message: 'El nombre de usuario no puede ser vacio' })
    .refine((value) => value !== '', {
      message: 'El nombre de usuario es requerido',
    }),
  password: z
    .string({ invalid_type_error, required_error })
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .max(20, 'La contraseña debe tener como máximo 20 caracteres')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,25}$/,
      'La contraseña debe tener al menos una letra mayúscula, una letra minúscula, un número y un caracter especial',
    )
    .refine((value) => value !== '', { message: 'La contraseña es requerida' }),
});
