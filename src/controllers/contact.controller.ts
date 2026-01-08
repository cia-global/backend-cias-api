import { Request, Response } from 'express';
import { resend } from '../services/resend.service';
import { contactSchema } from '../validators';
import { contactNotificationTemplate } from '../templates/emails';
import { config } from '../config';

export const sendContactMessage = async (req: Request, res: Response) => {
  try {
    // Validar datos de entrada
    const validatedData = contactSchema.parse(req.body);

    // Enviar email al administrador
    const { data, error } = await resend.emails.send({
      from: config.email.sender,
      to: config.email.admin,
      subject: `Nuevo mensaje de contacto: ${validatedData.subject}`,
      html: contactNotificationTemplate(validatedData),
      replyTo: validatedData.email,
    });

    if (error) {
      console.error('Error al enviar email:', error);
      return res.status(500).json({
        success: false,
        error: 'Error al enviar el mensaje',
        details: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Mensaje enviado exitosamente',
      data: { id: data?.id },
    });
  } catch (error: any) {
    console.error('Error en sendContactMessage:', error);
    
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