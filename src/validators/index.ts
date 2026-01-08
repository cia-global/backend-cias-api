import { z } from 'zod';

export const appointmentSchema = z.object({
  city_id: z.string().uuid('ID de ciudad inválido'),
  course_type_id: z.string().uuid('ID de tipo de curso inválido'),
  full_name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  id_number: z.string().min(5, 'Número de identificación inválido'),
  citation_number: z.string().min(1, 'Número de citación requerido'),
  phone: z.string().min(7, 'Número de teléfono inválido'),
  email: z.string().email('Email inválido'),
  appointment_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato de fecha inválido (YYYY-MM-DD)'),
  appointment_time: z.string().regex(/^\d{2}:\d{2}$/, 'Formato de hora inválido (HH:mm)'),
  status: z.enum(['pending', 'confirmed', 'completed', 'cancelled']).default('pending'),
});

export const contactSchema = z.object({
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(7, 'Número de teléfono inválido'),
  subject: z.string().min(2, 'El asunto debe tener al menos 5 caracteres'),
  message: z.string().min(5, 'El mensaje debe tener al menos 10 caracteres'),
});
