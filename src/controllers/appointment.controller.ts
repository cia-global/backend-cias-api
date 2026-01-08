import { Request, Response } from 'express';
import { supabase } from '../services/supabase.service';
import { resend } from '../services/resend.service';
import { appointmentSchema } from '../validators';
import { appointmentConfirmationTemplate } from '../templates/emails';
import { config } from '../config';
import { City, CourseType } from '../types';

export const createAppointment = async (req: Request, res: Response) => {
  try {
    // Validar datos de entrada
    const validatedData = appointmentSchema.parse(req.body);

    // Insertar en Supabase
    const { data: appointment, error: dbError } = await supabase
      .from('appointments')
      .insert([validatedData])
      .select()
      .single();

    if (dbError) {
      console.error('Error al crear agendamiento en Supabase:', dbError);
      return res.status(500).json({
        success: false,
        error: 'Error al crear el agendamiento',
        details: dbError.message,
      });
    }

    // Obtener información de la ciudad
    const { data: city, error: cityError } = await supabase
      .from('cities')
      .select('*')
      .eq('id', validatedData.city_id)
      .single();

    if (cityError) {
      console.error('Error al obtener ciudad:', cityError);
    }

    // Obtener información del tipo de curso
    const { data: course, error: courseError } = await supabase
      .from('course_types')
      .select('*')
      .eq('id', validatedData.course_type_id)
      .single();

    if (courseError) {
      console.error('Error al obtener tipo de curso:', courseError);
    }

    // Enviar email de confirmación al usuario
    try {
      if (city && course) {
        await resend.emails.send({
          from: config.email.sender,
          to: validatedData.email,
          subject: `Confirmación de Agendamiento - ${course.name}`,
          html: appointmentConfirmationTemplate(
            {
              full_name: validatedData.full_name,
              citation_number: validatedData.citation_number,
              appointment_date: validatedData.appointment_date,
              appointment_time: validatedData.appointment_time,
            },
            city as City,
            course as CourseType
          ),
        });
      }
    } catch (emailError) {
      console.error('Error al enviar email:', emailError);
      // No retornamos error aquí porque el agendamiento ya fue creado
    }

    return res.status(201).json({
      success: true,
      message: 'Agendamiento creado exitosamente',
      data: appointment,
    });
  } catch (error: any) {
    console.error('Error en createAppointment:', error);
    
    if (error.name === 'ZodError') {
      return res.status(400).json({
        success: false,
        error: 'Datos inválidos',
        details: error.errors,
      });
    }

    return res.status(500).json({
      success: false,
      error: 'Error interno del servidor',
      details: error.message,
    });
  }
};